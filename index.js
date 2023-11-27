const express = require('express');
const app = express();
const port = 3000;

const historyRoute = require('./routes/History')

const {
    getFruitsHistory
} = require('./controllers/Fruits.controller')

app.use('/history', historyRoute);

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
