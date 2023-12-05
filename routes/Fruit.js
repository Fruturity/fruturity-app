const express = require('express');
const Multer = require("multer");
const { getData, getDataById, deleteDataById, addData, getBookmarkedFruits, getBananas, getMangos, addNote } = require('../controllers/Fruits.controller');

const router = express.Router();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

router.get('/get', getData);
router.get('/bookmark', getBookmarkedFruits);
router.get('/bananas', getBananas);
router.get('/mangos', getMangos);

router.post('/:id/add/note', addNote);
router.get('/:id', getDataById);

router.post('/add', multer.single("image"), addData);

router.delete('/delete/:id', deleteDataById);

module.exports = router;
