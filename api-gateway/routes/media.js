const express = require('express');
const router = express.Router();

const mediaHandler = require('./handler/media')

// media routers
router.get('/', mediaHandler.getall);
router.post('/', mediaHandler.create);
router.delete('/:id', mediaHandler.destroy);

module.exports = router;
