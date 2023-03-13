const express = require('express');
const router = express.Router();
const { getMedia, createMedia, deleteMedia } = require('../handler/handler')

// media route
router.get('/', getMedia)
router.post('/', createMedia)
router.delete('/:id', deleteMedia)


module.exports = router;
