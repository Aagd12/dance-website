const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
// const { addListener } = require("process");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const db = 'mongodb+srv://saurabh:saurabh@123t@cluster0.7cw4e.mongodb.net/dancewebsite?retryWrites=true&w=majority';
mongoose.connect('mongodb+srv://saurabh:saurabh@123t@cluster0.7cw4e.mongodb.net/dancewebsite?retryWrites=true&w=majority', { useNewUrlParser: true }, { useUnifiedTopology: true }, )
    .then(() => {
        console.log("connection succesful");
    }).catch(() => {
        console.log("  no connection");
    })
const port = process.env.PORT || 8000;
const kittySchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    email: String,
    phone: Number
});
const contactus = mongoose.model('contactus', kittySchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    params = { 'message': 'This is best dance academy' };
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    params = { 'message': 'contact us for joining saurabh dance academy' };
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new contactus(req.body);
    myData.save().then(() => {

            res.render('home.pug');

        }).catch(() => {
            res.status(400).send('item was not saved to the databse')
        })
        // res.status(200).render('contact.pug');
});
// START THE SERVER
app.listen(port, () => {

    console.log(`the application started succesfullay on port ${port}`);

});