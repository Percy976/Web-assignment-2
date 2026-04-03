const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

mongoose.connect("mongodb://127.0.0.1:27017/Web Assignment 2")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));  

const userRoutes = require('./Routes/userRoutes');
app.use('/users', userRoutes);