const express = require('express');
const Multer = require("multer");
const { getData, getDataById, deleteDataById, addData, getBookmarkedFruits } = require('../controllers/Fruits.controller');

const router = express.Router();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

router.get('/get', getData);
router.get('/bookmark', getBookmarkedFruits);
router.post('/add', multer.single("image"), addData);
router.get('/:id', getDataById);
router.delete('/delete/:id', deleteDataById);

module.exports = router;
