'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');



const app = express();
app.use(cors());

const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/books',
    { useNewUrlParser: true, useUnifiedTopology: true });


const bookSchema = new mongoose.Schema({
    bookName: String,
    description: String,
    urlImg: String
});

const ownerSchema = new mongoose.Schema({
    ownerEmail: String,
    books: [bookSchema]
})


const bookModel = mongoose.model('book', bookSchema);
const ownerModel = mongoose.model('owner', ownerSchema);

function seedBookCollection() {
    const Light = new bookModel({
        bookName: 'Light',
        description: 'One of the most underrated prose writers demonstrates the literary firepower of science fiction at its best. Three narrative strands – spanning far-future space opera, contemporary unease and virtual-reality pastiche – are braided together for a breathtaking metaphysical voyage in pursuit of the mystery at the heart of reality.',
        urlImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJwwPWh_fnncXcnbYePfsLUTXEPpcVH8i0_A&usqp=CAU'
    });
    const Light1 = new bookModel({
        bookName: 'Light',
        description: 'One of the most underrated prose writers demonstrates the literary firepower of science fiction at its best. Three narrative strands – spanning far-future space opera, contemporary unease and virtual-reality pastiche – are braided together for a breathtaking metaphysical voyage in pursuit of the mystery at the heart of reality.',
        urlImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJwwPWh_fnncXcnbYePfsLUTXEPpcVH8i0_A&usqp=CAU'
    });
    
    Light.save();
    Light1.save();
}
seedBookCollection();

function seedOwnerCollection() {
    const haneen = new ownerModel({
        ownerEmail: 'aabonser@gmail.com',
        books: [
            {
                bookName: 'Light',
                description: 'One of the most underrated prose writers demonstrates the literary firepower of science fiction at its best. Three narrative strands – spanning far-future space opera, contemporary unease and virtual-reality pastiche – are braided together for a breathtaking metaphysical voyage in pursuit of the mystery at the heart of reality.',
                urlImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJwwPWh_fnncXcnbYePfsLUTXEPpcVH8i0_A&usqp=CAU'
            },
            {
                bookName: 'Light1',
                description: '1One of the most underrated prose writers demonstrates the literary firepower of science fiction at its best. Three narrative strands – spanning far-future space opera, contemporary unease and virtual-reality pastiche – are braided together for a breathtaking metaphysical voyage in pursuit of the mystery at the heart of reality.',
                urlImg: '2https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJwwPWh_fnncXcnbYePfsLUTXEPpcVH8i0_A&usqp=CAU'
            }
        ]
    })

    haneen.save();
}


seedOwnerCollection();

app.get('/', homePageHandler);
app.get('/books', getBooksHandler);

//http://localhost:3001/books?email=aabonser@gmail.com
function getBooksHandler(req, res) {
    let { email } = req.query;
    // let {name} = req.query
    ownerModel.find({ ownerEmail: email }, function (err, ownerData) {
        if (err) {
            console.log('did not work')
        } else {
            console.log(ownerData)
            // console.log(ownerData[0])
            // console.log(ownerData[0].books)
            res.send(ownerData[0].books)
        }
    })
}

function homePageHandler(req, res) {
    res.send('Hello from the homePage')
}

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})


