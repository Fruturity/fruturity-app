const fruits = require('../models/Fruits.model');

const getFruitsHistory = ((req,res) => {
    res.json(fruits);
});

const getFruit = ((req,res) => {
    const id = parseInt(req.params.id);
    const fruit = fruits.filter(f => f.id === id );
    res.status(200).send(fruit);
})

const addFruit = ((req,res) => {
    const { ripeness, category, date, image, bookmark } = req.body;

    const newFruit = {
        id: fruits.length + 1,
        ripeness: ripeness,
        category: category,
        date: date,
        image: image,
        bookmark: bookmark,
    }

    fruits.push(newFruit);
    res.status(200).send('Fruit added!');
})

const deleteFruit = ((req,res) => {
    const id = req.params.id;
    const index = fruits.findIndex(fruit => fruit.id === id);
    fruits.splice(index,1)
    res.status(200).send('Fruit deleted!')
})

module.exports = {
    getFruitsHistory,
    getFruit,
    addFruit,
    deleteFruit
}
