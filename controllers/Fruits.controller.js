const fruits = require('../models/Fruits.model');

const getFruitsHistory = ((req,res) => {
    res.json(fruits);
});

const addFruit = ((req,res) => {
    const newFruit =  {
        id: fruits.length + 1,
        ripeness: req.body.ripeness,
        category: req.body.category,
        date: req.body.date,
        image: req.body.image,
        bookmark: req.body.bookmark,
    }

    fruits.push(newFruit);
    res.status(201).json(newFruit);
})

module.exports = {
    getFruitsHistory,
    addFruit,
}
