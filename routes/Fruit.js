const express = require('express');
const { addFruit, deleteFruit, getFruit } = require('../controllers/Fruits.controller');
const router = express.Router();

router.post('/add', addFruit);

router.get('/delete/:id', deleteFruit)

router.get('/:id', getFruit)

module.exports = router;
