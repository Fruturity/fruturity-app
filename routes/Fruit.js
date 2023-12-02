const express = require('express');
const Multer = require("multer");
const { addFruit, deleteFruit, getFruit, uploadToBucket, getData, getDataById, deleteDataById, addData } = require('../controllers/Fruits.controller');

const router = express.Router();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

// router.post('/add', addFruit);

// router.get('/delete/:id', deleteFruit)

// router.get('/:id', getFruit)

router.post('/upload', multer.single("image"), uploadToBucket);

router.get('/get', getData);
router.post('/add', multer.single("image"), addData);
router.get('/:id', getDataById);
router.delete('/delete/:id', deleteDataById);

module.exports = router;
