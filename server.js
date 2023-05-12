const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://0.0.0.0:27017/products', {useNewUrlParser: true, useUnifiedTopology: true});

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
});

const Product = mongoose.model('Product', ProductSchema);


app.get('/products', (req, res) => {
    Product.find().then(products => {
        res.json(products);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id).then(product => {
        if (!product) return res.status(404).send('No product found');
        res.json(product);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/products', (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    newProduct.save().then(product => {
        res.json(product);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {price: req.body.price}, {new: true}).then(updatedProduct => {
        if (!updatedProduct) return res.status(404).send('No product found');
        res.json(updatedProduct);
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = app;
