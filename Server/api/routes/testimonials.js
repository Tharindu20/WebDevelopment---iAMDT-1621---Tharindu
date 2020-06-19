const express = require('express');
var momenttz = require('moment-timezone');
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient;
const router = express.Router();
var Q = require("q");


router.post('/addtestimonials',(req, res, next) => {
    var name = req.body.name;
    var age = req.body.age;
    var testimonial = req.body.testimonial;
    var other_info = req.body.other_info;

    var created_datetime = moment().utc().format('YYYY-MM-DD HH:mm:ss.ms');

    if (name != undefined && name != "" && age != undefined && age != "" && testimonial != undefined && testimonial != "" ) {
        
        var url = "mongodb://localhost:27017/ amdt_db";  
        MongoClient.connect(url, function(err, db) {  
        
            if (err) throw err;  
            
            var objTestimonial = { name: name, age: age, testimonial: testimonial,other_info:other_info };  
            
            db.collection("testimonials").insertOne(objTestimonial, function(err, res) {  
                if (err) throw err;  
                console.log("1 record inserted");  
                db.close();     
            });

        });  

        res.status(200).json({'returnval': '1', 'msg': 'Inserted successfully.'});

    } else {
        res.status(200).json({'returnval': '0', 'msg': 'Required parameters cannot be empty.'});
    }


});

router.post('/listtestimonials',(req, res, next) => {

    var http = require('http');  
    var MongoClient = require('mongodb').MongoClient;  
    var url = "mongodb://localhost:27017/amdt_db";  

    MongoClient.connect(url, function(err, db) {  
      if (err) throw err; 

      db.collection("testimonials").find({}).toArray(function(err, result) {  
        if (err) throw err;  
        res.status(200).json({'returnval': '1', 'testimonials': result});
        db.close();  
      });  
    });  
});

module.exports = router;