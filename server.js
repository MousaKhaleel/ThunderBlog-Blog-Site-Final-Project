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
const session = require('express-session');
// const path = require('path');
const jwt=require('jsonwebtoken')
//const cookieParser=require('cookie-parser')
const secret ='eownjdoe94eifejdo9eodfjieei';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json())//instead of body parser
app.use(session({
    secret,
    resave: false,
    saveUninitialized: false,
  }));
//app.use(cookieParser())


// var bodyParse= require('body-parser')

// var urlEncoded= bodyParse.urlencoded({extended:false})

app.get('/',function(req,res)
{
    res.send('server started');
});


// app.post('/login',async(req,res)=>{
//     const { name, email, password } = req.body;
//     const findAuthor= await userCollection.findOne({'Name':name,'Email':email,'Password':password})
//     if(findAuthor){
//         jwt.sign({name,id:findAuthor._id},secret,
//             {secure:true}
//             ,(err,token)=>{
//             if (err) throw err
//             res.session.user={
//                 id:findAuthor._id,
//                 name,
//             }
//             res.json({ id: findAuthor._id, name, token })
//         });
//     }
//     else{
//         res.status(400).json('wrong');
//     }
// });

app.post('/login', async (req, res) => {
    const { name, email, password } = req.body;
    const findAuthor = await userCollection.findOne({ 'Name': name, 'Email': email, 'Password': password });
    
    if (findAuthor) {
      jwt.sign({ name, id: findAuthor._id }, secret, { secure: true }, (err, token) => {
        if (err) throw err;
        req.session.token = token; // Set session token
        res.json({ id: findAuthor._id, name, token });
      });
    } else {
      res.status(400).json('wrong');
    }
  });
app.post('/logout', (req,res) => {
    req.session.destroy(err => {
        if (err) {
          console.error('Error destroying session:', err);
        }
        res.json('Logged out');
      });
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

app.get('/profile',(req,res)=>{
     const {token} = req.session;
     jwt.verify(token, secret,{secure:true}, (err,info)=>{
        if (err) throw err;
         res.json(info)
     })
    // res.json(req.cookies)

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



app.get('/profile',(req,res)=>{
    const {token}=req.cookies
    jwt.verify(token,{},(e,info)=>{
        res.json(info)
    })
})

.post('/logout',function(req,res){
    res.cookie('token','').json('ok')
})


app.post('/addblog',async(req,res)=>{

    try {
        const { title, content, id } = req.body;
            await userCollection.insertOne({ 'Title': title, 'Content': content, 'AuthorID': id });
            res.send('add successfully');
    } catch (error) {
        console.error('Error:', error);
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

// const express = require('express');
// const session = require('express-session');
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 8000;
// const connectionString = 'mongodb+srv://yazeedfayoumi:kcuHGtF30ENDME6p@atlascluster.kgxlft7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const databaseName = 'myFirstDatabase';
// const collectionName = 'users';

// // Connect to MongoDB
// MongoClient.connect(connectionString, (err, client) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Connected to MongoDB')
// });

//   // Initialize app
//   app.use(cors());
//   app.use(bodyParser.urlencoded({ extended: true }));
//   app.use(bodyParser.json());
//   app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//   // Login route
//   app.post('/login', async (req, res) => {
//     const { name, email, password } = req.body;

//     // Find user
//     const collection = client.db(databaseName).collection(collectionName);
//     const user = await collection.findOne({ name, email });

//     // Check password
//     if (user && user.password === password) {
//       // Create and assign token
//       const token = jwt.sign({ name, email }, 'secret');
//       req.session.token = token;

//       res.send({ name, email, token });
//     } else {
//       res.status(401).send('Invalid credentials');
//     }
//   });

//   // Register route
//   app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const collection = client.db(databaseName).collection(collectionName);
//     const user = await collection.findOne({ email });

//     if (!user) {
//       // Insert user
//       await collection.insertOne({ name, email, password });
//       res.send('Registration successful');
//     } else {
//       res.status(400).send('User already exists');
//     }
//   });

//   // Logout route
//   app.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.send('Error logging out');
//       }
//       res.send('Logged out');
//     });
//   });

//   // Profile route
//   app.get('/profile', (req, res) => {
//     const token = req.session.token;

//     if (token) {
//       jwt.verify(token, 'secret', (err, decoded) => {
//         if (err) {
//           return res.sendStatus(403);
//         }
//         res.send(decoded);
//       });
//     } else {
//       res.sendStatus(401);
//     }});
//     app.get('/allblogs',async(req,res)=>{
//     const allBlogs= await blogCollection.find({}).toArray()
//     res.send(allBlogs)
// })

// var server=app.listen(8000,function(){
//     var host=server.address().address;
//     var port=server.address().port;
// });

// const express = require('express');
// const session = require('express-session');
// const MongoClient = require('mongodb').MongoClient;
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 8000;
// const connectionString = 'mongodb+srv://yazeedfayoumi:kcuHGtF30ENDME6p@atlascluster.kgxlft7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const databaseName = 'myFirstDatabase';
// const collectionName = 'users';

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// MongoClient.connect(connectionString, (err, client) => {
//   if (err) {
//     console.error('Failed to connect to MongoDB:', err);
//     return;
//   }

//   console.log('Connected to MongoDB');

//   const collection = client.db(databaseName).collection(collectionName);

//   // Login route
//   app.post('/login', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//       const user = await collection.findOne({ name, email });

//       if (user && user.password === password) {
//         const token = jwt.sign({ name, email }, 'secret');
//         req.session.token = token;
//         res.send({ name, email, token });
//       } else {
//         res.status(401).send('Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

//   // Register route
//   app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//       const user = await collection.findOne({ email });

//       if (!user) {
//         await collection.insertOne({ name, email, password }); // Consider hashing the password
//         res.send('Registration successful');
//       } else {
//         res.status(400).send('User already exists');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

//   // Logout route
//   app.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error('Error logging out:', err);
//         return res.status(500).send('Internal Server Error');
//       }
//       res.send('Logged out');
//     });
//   });

//   // Profile route
//   app.get('/profile', (req, res) => {
//     const token = req.session.token;

//     if (token) {
//       jwt.verify(token, 'secret', (err, decoded) => {
//         if (err) {
//           console.error('Error verifying token:', err);
//           return res.sendStatus(403);
//         }
//         res.send(decoded);
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   });

//   // Start server
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// });