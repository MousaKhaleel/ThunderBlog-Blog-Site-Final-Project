const {MongoClient}=require('mongodb')
// var connection="mongodb+srv://user1:qwe12345678@cluster0.1ogr7io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
var connection="mongodb+srv://yazeedfayoumi:kcuHGtF30ENDME6p@atlascluster.kgxlft7.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
const client= new MongoClient(connection)

const myDb= client.db('Blog-Website')

const userCollection= myDb.collection('User-Accounts')
const blogCollection= myDb.collection('Blogs')

const express= require('express');
var app=express();
const cors = require("cors");
// const path = require('path');
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const secret ='eownjdoe94eifejdo9eodfjieei';
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json())//instead of body parser
app.use(cookieParser())


// var bodyParse= require('body-parser')

// var urlEncoded= bodyParse.urlencoded({extended:false})

app.get('/',function(req,res)
{
    res.send('server started');
});


app.post('/login',async(req,res)=>{
    const { name, email, password } = req.body;
    const findAuthor= await userCollection.findOne({'Name':name,'Email':email,'Password':password})
    if(findAuthor){
        jwt.sign({name,id:findAuthor._id},secret,{},(err,token)=>{
            if (err) throw err
            res.cookie('token',token).json('ok')
        });
    }
    else{
        res.status(400).json('wrong');
    }
});


app.post('/register',async(req,res)=>{

    try {
        const { name, email, password } = req.body;
        const existingUser = await userCollection.findOne({ 'Email': email });

        if (!existingUser) {
            await userCollection.insertOne({ 'Name': name, 'Email': email, 'Password': password });
            res.send('Registration successful');
        } else {
            res.status(400).send('User already exists');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/profile',async(req,res)=>{
    res.json(req.cookies)
 });
 
app.post('/addBlog',async(req,res)=>{
    try {
        const { title, content, date, authorId } = req.body;
        const existingBlog = await blogCollection.findOne({ 'Title': title });

        if (!existingBlog) {
            await blogCollection.insertOne({ 'Title': title, 'Content': content, 'Date': date });
            res.send('Blog published');
        } else {
            res.status(400).send('Blog shares same title');
        }
    } catch (error) {
        console.error('Error publishing:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/allblogs',async(req,res)=>{
    const allBlogs= await blogCollection.find({}).toArray()
    res.send(allBlogs)
})


var server=app.listen(8000,function(){
    var host=server.address().address;
    var port=server.address().port;
});