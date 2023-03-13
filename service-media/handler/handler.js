const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const { Media } = require('../models')
const { returnResponse } = require('../helper/helper');
const fs = require('fs');

const getMedia = async (req, res) => {

    // fetch data from database
    const media = await Media.findAll({
        attributes: ['id', 'image']
    })

    // mapping data
    const mappedMedia = media.map((m) => {
        m.image = `${req.get('host')}/${m.image}`
        return m
    })

    return returnResponse(res, mappedMedia, 200)
}

const createMedia = async (req, res) => {
    const image = req.body.image;

    // check valid format base64
    if (!isBase64(image, { mimeRequired: true })) {
        let msg = 'Invalid base64'
        return returnResponse(res, null, msg, 400, false)
    }
    
    base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
        // check if any error
        if (err) {
            return returnResponse(res, null, err.message, 400, false)
        }

        // 'public/images/1231312.png'
        const filename = filepath.split('/').pop()
        const media = await Media.create({ image: `images/${filename}` })

        const data = {
            id: media.id,
            image: `${req.get('host')}/images/${filename}`
        }

        return returnResponse(res, data, 'media created', 200, true)
    })
}

const deleteMedia = async (req, res) => {
    const id = req.params.id
    const media = await Media.findByPk(id)

    // check if media not exist
    if (!media) {
        return returnResponse(res, null, 'media not found', 404, false)
    }

    // check image exists and delete it
    fs.unlink(`./public/${media.image}`, async (err) => {
        if (err) {
            return returnResponse(res, null, err.message, 400, false)
        }

        // delete data in database
        await media.destroy()

        return returnResponse(res, null,  'image deleted', 200, true)
    })
}

module.exports =  {
    getMedia,
    createMedia,
    deleteMedia
};