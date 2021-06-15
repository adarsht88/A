var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Item = require('./item');
var app = express();
var Server = /** @class */ (function () {
    function Server() {
        this.initDB();
        this.initExpressMiddleware();
        this.postItems();
        this.initRoutes();
        this.start();
    }
    Server.prototype.postItems = function () {
        app.post('/inventory', function (req, res) {
            console.log("hello...");
            var newItem = {
                name: req.body.name,
                quantity: req.body.quantity
            };
            var items = new Item(newItem);
            items.save()
                .then(function (items) {
                res.send(newItem);
            })["catch"](function (err) {
                console.log(err);
            });
        });
    };
    ;
    Server.prototype.initDB = function () {
        var dburl = "mongodb+srv://travis:Adarsh1998@test-adarsh.rhscl.mongodb.net/inventory?retryWrites=true&w=majority";
        mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(function (items) {
            console.log("connected...");
        })["catch"](function (err) {
            console.log(err);
        });
    };
    Server.prototype.initExpressMiddleware = function () {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    };
    Server.prototype.initRoutes = function () {
        app.get('/inventory', function (req, res) {
            Item.find()
                .then(function (items) {
                res.send(items);
            })["catch"](function (err) {
                console.log(err);
            });
        });
        /*
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
         */
        app.get('/inventory/:name', function (req, res) {
            var reqProduct = mongoose.Types.ObjectId(req.params.name);
            Item.findById(reqProduct)
                .then(function (items) {
                res.send(items);
            })["catch"](function (err) {
                console.log(err);
            });
        });
        app.put('/inventory/:name', function (req, res) {
            var itemName = req.params.name;
            Item.findByIdAndUpdate(itemName, req.body)
                .then(function (items) {
                res.send(items);
            })["catch"](function (err) {
                console.log(err);
            });
        });
        app["delete"]('/inventory', function (req, res) {
            Item.deleteMany({})
                .then(function (items) {
                res.send("All items deleted");
            })["catch"](function (err) {
                console.log(err);
            });
        });
        app["delete"]('/inventory/:name', function (req, res) {
            var reqProduct = (req.params.name);
            Item.findByIdAndDelete(reqProduct)
                .then(function (items) {
                res.send("item deleted.");
            })["catch"](function (err) {
                console.log(err);
            });
        });
    };
    Server.prototype.start = function () {
        app.listen(8000, function () {
            console.log("Server started at 8000");
        });
    };
    return Server;
}());
let server = new Server();
