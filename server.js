const {MongoClient}=require('mongodb')
var connection="mongodb+srv://user1:qwe12345678@cluster0.1ogr7io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client= new MongoClient(connection)

const mydb= client.db('Blog-Website')

const userCollection= mydb.collection('User-Accounts')
const blogCollection= mydb.collection('Blogs')

const express= require('express');
var app=express();
const cors = require("cors");
app.use(cors());
// app.use(express.json())//used body parser


var bodyParse= require('body-parser')

var urlEncoded= bodyParse.urlencoded({extended:false})

app.get('/',function(req,res)
{
    res.send('server started');
});


app.post('/login',urlEncoded,async(req,res)=>{
    const findAuthor= await userCollection.findOne({'Name':req.body.name,'Email':req.body.email,'Password':req.body.password})
    if(findAuthor){
        res.send('welcome')
    }
    else{   
        res.redirect('/Register')
    }
})


app.post('/register',urlEncoded,async(req,res)=>{
    const addAuthor= await userCollection.findOne({'Name':req.body.name,'Email':req.body.email,'Password':req.body.password})
    if(addAuthor){
        await userCollection.insertOne({'Name':req.body.name,'Email':req.body.email,'Password':req.body.password})
    }
    res.send()
})


app.get('/allblogs',async(req,res)=>{
    const allBlogs= await blogCollection.find({}).toArray()
    res.send(allBlogs)
})


var server=app.listen(8000,function(){
    var host=server.address().address;
    var port=server.address().port;
});