const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv')

const historyRoute = require('./routes/History')
const fruitRoute = require('./routes/Fruit')

const {
    getFruitsHistory
} = require('./controllers/Fruits.controller')

dotenv.config();

app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use('/history', historyRoute);
app.use('/fruit', fruitRoute);


app.get('/', (req, res) => {
    res.send('Home page!');
})

app.get('/history', getFruitsHistory)

app.get('/bookmarks', (req,res) => {
    res.send('Get bookmark data');
})

app.listen(process.env.PORT || port, () => {
    console.log(`app listening on port ${port}`);
})
