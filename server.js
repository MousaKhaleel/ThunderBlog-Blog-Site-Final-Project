require('dotenv').config()

const {MongoClient}=require('mongodb')
// var connection="mongodb+srv://user1:qwe12345678@cluster0.1ogr7io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// var connection="mongodb+srv://yazeedfayoumi:kcuHGtF30ENDME6p@atlascluster.kgxlft7.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
const client= new MongoClient(process.env.MOUSA_MONGODB_CONNECTION_STRING)

const myDb= client.db('Blog-Website')

const userCollection= myDb.collection('User-Accounts')
const blogCollection= myDb.collection('Blogs')

const express= require('express');
var app=express();
const cors = require("cors");
// const path = require('path');
const jwt=require('jsonwebtoken')
const cp=require('cookie-parser')
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json())//instade of body parser
app.use(cp())

const { ObjectId } = require('mongodb');

// bu43ry8477r8gbn4f3e834iu
const secret=process.env.JWT_SECRET;
// var bodyParse= require('body-parser')

// var urlEncoded= bodyParse.urlencoded({extended:false})

app.get('/',function(req,res)
{
    res.send('server started');
});



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const findAuthor = await userCollection.findOne({ 'Email': email, 'Password': password });
    if (findAuthor) {
      const token = jwt.sign({ name: findAuthor.Name, id: findAuthor._id, email, password }, secret);
      res.cookie('token', token, { httpOnly: true }).json('ok');
    } else {
      res.status(400).json('Wrong info try again');
    }
  });


app.post('/register',async(req,res)=>{

    try {
        const { name, email, password } = req.body;
        const existingUser = await userCollection.findOne({ 'Email': email });
        if (!existingUser) {
            await userCollection.insertOne({ 'Name': name, 'Email': email, 'Password': password,'History':[] });
            res.send('Registration successful');
        } else {
            res.status(400).send('User already exists');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      res.json(decoded);
    });
  });
  
  app.post('/logout', function (req, res) {
    res.clearCookie('token').json('ok');
  });
  


  app.post('/addblog', async (req, res) => {
    try {
        const { title, preview, content, userId, tags } = req.body;
        await blogCollection.insertOne({ 'Title': title, 'Content': content, 'Preview': preview, 'AuthorID': userId, 'Tags': tags });
        res.send('Added successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/allblogs', async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipBlogs = (page - 1) * limit;
    const allBlogs = await blogCollection.find({}).skip(skipBlogs).limit(limit).toArray();
    res.send(allBlogs);
})

app.get('/content/:id', async(req,res)=>{
  const id = new ObjectId(req.params.id);
  const Content=await blogCollection.findOne({'_id':id})
  res.json(Content)
})

app.get('/content/:id/:userId', async(req,res)=>{
  const id = new ObjectId(req.params.id);
  const Content=await blogCollection.findOne({'_id':id})
          if(Content){
        const dUser= await userCollection.findOneAndUpdate({ '_id': new ObjectId(req.params.userId) }, { $pull: { History: id }})
        const upUser= await userCollection.findOneAndUpdate({ '_id': new ObjectId(req.params.userId) }, { $push: { History: id }})
        }
  res.json(Content)
})

app.get('/history/:userId', async(req,res)=>{
  const hist= await userCollection.findOne({ '_id': new ObjectId(req.params.userId)})
  res.json(hist.History)
})


app.get('/userblogs/:id', async(req,res)=>{
  const id = req.params.id;
  rus=await blogCollection.find({'AuthorID':id}).toArray()
  res.json(rus)
})

app.get('/historyblogs/:id', async(req,res)=>{
  const id = new ObjectId(req.params.id);
  rus=await blogCollection.findOne({'_id':id})
  res.json(rus)
})

app.post('/recommendedblogs', async (req, res) => {
  try {
    const { topTags } = req.body;

    let result = await blogCollection.find({ Tags: { $all: topTags } }).toArray();
    
    if (result.length === 0) {
    const result = await blogCollection.find({ Tags: { $in: topTags } }).toArray();
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/deletehistory/:userId', async(req,res)=>{
        const upUser= await userCollection.findOneAndUpdate({ '_id': new ObjectId(req.params.userId) }, { $set: { History:[] }})
  res.json({success: true})
})

app.post('/changePassword', async(req,res)=>{
const dUser= await userCollection.findOneAndUpdate({ '_id': new ObjectId(req.body.userId) }, { $set: { Password: req.body.password }})
res.send('password changed successfully');
})


app.delete('/deleteBlog/:id', async(req,res)=>{
  const dUser=await blogCollection.findOneAndDelete({'_id':new ObjectId(req.params.id)})
  const upUser = await userCollection.updateMany({}, { $pull: { History: { $in: [new ObjectId(req.params.id)] } } });
res.json({success: true})
})


var server=app.listen(process.env.PORT || 8000,function(){
    var host=server.address().address;
    var port=server.address().port;
});