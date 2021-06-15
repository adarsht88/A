
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');


var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var inventory = [{
        name: "Apples",
        quantity: 3
    },
    {
        name: "Oranges",
        quantity: 7
    },
    {
        name: "Pomegranates",
        quantity: 55
    }
];

app.get('/inventory/', (req, res) => {
    res.send(inventory);
});

app.get('/inventory/:name', (req, res) => {
    var reqProduct = req.params.name;
    var product = inventory.find(product => product.name === reqProduct);
    if (product) {
        res.send(product);
    } else {
        res.send({ message: `Product ${reqProduct} doesn't exist` });
    }
});


app.put('/inventory/', (req, res) => {
    var newInventory = req.body;
    if (!newInventory) return res.status(404).json({ message: 'Not Found' });
    inventory = newInventory;
    res.send(inventory);
});


app.put('/inventory/:name', (req, res) => {
    var itemName = req.params.name;
    var item = inventory.find(item => item.name === itemName);
    if (!item) return res.status(404).json({ message: 'Not Found' });
    if (req.body.name) {
        item.name = req.body.name;
    }
    if (req.body.quantity) {
        item.quantity = req.body.quantity;
    }
    res.json(item);
});


app.post('/inventory/', (req, res) => {
    var newItem = req.body;
    if (newItem) {
        inventory.push(newItem);
        res.send("Item added to inventory successfully.")
    } else {
        res.send("Couldn't add item to inventory");
    }
});



app.delete('/inventory/', (req, res) => {
    inventory = [];
    if (inventory === null) {
        res.send("Delete request Failed");
    } else {
        res.send("Successfully deleted all items from the inventory");
    }
});


app.delete('/inventory/:name', (req, res) => {
    const itemName = req.params.name;
    var item = inventory.find(item => item.name === itemName);
    if (!item) return res.status(404).json({ message: 'Not Found' });
    var itemIndex = inventory.indexOf(item);
    inventory.splice(itemIndex, 1);
    res.json(inventory);
});


app.listen(8080,()=>{
    console.log("Server started at 8080");
});
