const express = require('express');
const router = express.Router();
const { getMedia, createMedia, deleteMedia } = require('../handler/handler')

// get media
router.get('/', getMedia)
// create media
router.post('/', createMedia)

router.delete('/:id', deleteMedia)


module.exports = router;
