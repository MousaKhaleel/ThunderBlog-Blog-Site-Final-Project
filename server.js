const {MongoClient}=require('mongodb')
var connection="mongodb+srv://yazeedfayoumi:kcuHGtF30ENDME6p@atlascluster.kgxlft7.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
const client= new MongoClient(connection)

const myDb= client.db('Blog-Website')

const userCollection= myDb.collection('User-Accounts')
const blogCollection= myDb.collection('Blogs')

const express= require('express');
var app=express();
const cors = require("cors");
const path = require('path');
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
        const registerFilePath = path.join(__dirname, '/src/components/Register.js');
        res.sendFile(registerFilePath);

       // res.sendFile(path.join(__dirname, '/path/to/Register.js'));

      // res.redirect('http://localhost:8000/register');
    }
})


app.post('/register',urlEncoded,async(req,res)=>{

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


app.get('/allblogs',async(req,res)=>{
    const allBlogs= await blogCollection.find({}).toArray()
    res.send(allBlogs)
})


var server=app.listen(8000,function(){
    var host=server.address().address;
    var port=server.address().port;
});