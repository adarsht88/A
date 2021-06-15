
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const Item = require('./item')


var app = express();
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

const dburl = "mongodb+srv://travis:Adarsh1998@test-adarsh.rhscl.mongodb.net/inventory?retryWrites=true&w=majority"

mongoose.connect(dburl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((items)=>{
        console.log("connected...")
    })
    .catch((err)=>{
        console.log(err);
    })




app.get('/inventory', (req, res) => {
    
    Item.find()
        .then((items)=>{
            res.send(items);
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.post('/inventory', (req, res) => {
    var newItem =  {
        name: req.body.name,
        quantity: req.body.quantity
    }
    const items = new Item(newItem)
    items.save()
        .then((items)=>{
            res.send(newItem);
        })
        .catch((err)=>{
            console.log(err);
        })

});

app.get('/inventory/:name', (req, res) => {
    const reqProduct = mongoose.Types.ObjectId (req.params.name)
    Item.findById(reqProduct)
        .then((items)=>{
            res.send(items);
        })
        .catch((err)=>{
            console.log(err);
        })  
});


app.put('/inventory/:name', (req, res) => {
    const itemName = req.params.name;
    Item.findByIdAndUpdate(itemName, req.body)
        .then((items)=>{
            res.send(items);
        })
        .catch((err)=>{
            console.log(err);
        })  
});


app.delete('/inventory', (req, res) => {
    Item.deleteMany({})
        .then((items)=>{
            res.send("All items deleted");
        })
        .catch((err)=>{
            console.log(err);
        })  
});

app.delete('/inventory/:name', (req, res) => {
    const reqProduct = (req.params. name)
    Item.findByIdAndDelete(reqProduct)
        .then((items)=>{
            res.send("item deleted.");
        })
        .catch((err)=>{
            console.log(err);
        })  
});


app.listen(8000,()=>{
    console.log("Server started at 8000");
});
