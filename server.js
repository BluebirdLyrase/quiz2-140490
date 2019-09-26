// server.js
// load the things we need
var express = require('express');
var app = express();
// set up Mongo
var mongo = require("mongodb");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mean.psu.ac.th:27017/";
var options = { useUnifiedTopology: true, useNewUrlParser: true };

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function (req, res) {
                res.render('pages/Home');
});

// about page 
app.get('/products', function (req, res) {
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fullstack");
        var query = {};
        dbo.collection("products")
            .find(query)
            .toArray(function (err, result) {
                if (err) throw err;
                // console.log(result);
                res.render('pages/productlist', { data: result });
                db.close();
            });
    });

});

app.get('/products/:id', function (req, res) {
    MongoClient.connect(url, options, function (err, db) {
        var did = req.params.id;
        // console.log('id is '+did);
        if (err) throw err;
        var dbo = db.db("fullstack");
        var query = {ProductID:did};
        dbo.collection("products")
        .findOne(query, function(err, result) {
                if (err) throw err;
                // console.log(result);
                res.render('pages/productdetail', { data: result });
                db.close();
            });
    });

});

app.listen(8080);
console.log('port 8080');