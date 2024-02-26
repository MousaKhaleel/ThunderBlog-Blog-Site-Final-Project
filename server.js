const {MongoClient}=require('mongodb')
var connection="mongodb+srv://user1:qwe12345678@cluster0.1ogr7io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client= new MongoClient(connection)

const mydb= client.db('test')

const collection= mydb.collection('Users')

const express= require('express');
var app=express();
const cors = require("cors");

app.get('/',function(req,res)
{
    res.send('server started');
});



var server=app.listen(8000,function(){
    var host=server.address().address;
    var port=server.address().port;
});