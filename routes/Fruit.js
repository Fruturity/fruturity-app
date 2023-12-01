const express = require('express');
const Multer = require("multer");
const { addFruit, deleteFruit, getFruit, uploadToBucket } = require('../controllers/Fruits.controller');

const router = express.Router();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

router.post('/add', addFruit);

router.get('/delete/:id', deleteFruit)

router.get('/:id', getFruit)

router.post('/upload', multer.single("imgfile"), uploadToBucket);

module.exports = router;
