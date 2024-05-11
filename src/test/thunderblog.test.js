const {MongoClient}=require('mongodb')
const request = require("supertest");
// const myDb = require('../../server.js'); 
// const client = require('../../server.js'); 
// const connection = require('../../server.js');
// const findAuthor = require('../../server.js');
// const existingUser = require('../../server.js');


require("dotenv").config()

const jwt = require('jsonwebtoken')
const secret = 'bu43ry8477r8gbn4f3e834iu';

const { app, userCollection, blogCollection } = require("../../server.js");
const { Cookie } = require('express-session');
//  const {userCollection} = require('../../server.js');
//  userCollection = Object; 
// const {blogCollection} = require('../../server.js');

console.log(typeof app);
// console.log(typeof findAuthor);
console.log(typeof userCollection);

it("it should pass lol", () =>{

})

describe('GET /allblogs', () => { //works
    it('responds with all blogs in the database', async () => {
      const response = await request(app).get('/allblogs');
  
      expect(response.status).toBe(200);
        
      expect(response.body).toBeDefined();
    });
});

describe("GET /allblogs", () => { //also works :)
    it("should return all blogs", async () => {
        return request(app)
            .get("/allblogs")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});
// const mockFindAuthor = findAuthor({
//   createUser,
//   getUser
// })

describe("Login Endpoint", () => {
  it("should log in user with valid credentials", async () => {
    // Mock user data
    const userData = { email: "test@example.com", password: "password" };

    // Insert mock user data into the database
    await userCollection.insertOne(userData);

    // Send a login request with mock user credentials
    const response = await request(app)
      .post("/login")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(200);

    // Assert that the response contains a token
    expect(response.body).toHaveProperty("token");
  });

  it("should return 400 for invalid credentials", async () => {
    // Send a login request with invalid credentials
    const response = await request(app)
      .post("/login")
      .send({ email: "invalid@example.com", password: "invalid" })
      .expect("Content-Type", /json/)
      .expect(400);

    // Assert that the response contains an error message
    expect(response.body).toEqual("Wrong info try again");
  });
});

// describe('POST /register', () => {
//   it('should create a new user and return success message', async () => {
//     const newUser = {
//       name: 'John',
//       email: 'johfn.doe@example.com',
//       password: 'password123'
//     };

//     const res = await request(app)
//       .post('/register')
//       .send(newUser);

//     expect(res.status).toBe(200);
//     expect(res.text).toBe('Registration successful');

//     // Verify that the user was added to the database
//     const user = await userCollection.findOne({ 'Email': newUser.email });
//     expect(user).not.toBeNull();
//     expect(user.Name).toBe(newUser.name);
//     expect(user.Email).toBe(newUser.email);
//     expect(user.Password).toBe(newUser.password);
//   });

//   it('should return error if user already exists', async () => {
//     const existingUser = {
//       name: 'Jane Doe',
//       email: 'jane.doe@example.com',
//       password: 'password456'
//     };

//     // Add the existing user to the database
//     await userCollection.insertOne({ 'Name': existingUser.name, 'Email': existingUser.email, 'Password': existingUser.password,'History':[] });

//     const res = await request(app)
//       .post('/register')
//       .send(existingUser);

//     expect(res.status).toBe(400);
//     expect(res.text).toBe('User already exists');
//   });

//   it('should return error if required fields are missing', async () => {
//     const res = await request(app)
//       .post('/register')
//       .send({});

//     expect(res.status).toBe(400);
//     expect(res.text).toBe('Name is required');

//     const res2 = await request(app)
//       .post('/register')
//       .send({ name: 'John Doe' });

//     expect(res2.status).toBe(400);
//     expect(res2.text).toBe('Email is required');

//     const res3 = await request(app)
//       .post('/register')
//       .send({ name: 'John Doe', email: 'john.doe@example.com' });

//     expect(res3.status).toBe(400);
//     expect(res3.text).toBe('Password is required');
//   });
// });
        ////////////////////////////////
// describe("Register Endpoint", () => {
//   it("should register a new user", async () => {
//     // Mock user data
//     const userData = { name: "TestUser", email: "test@example.com", password: "password" };

//     // Send a register request with mock user data
//     const response = await request(app)
//       .post("/register")
//       .send(userData)
//       .expect("Content-Type", /text/) // Adjusted expectation to JSON
//       .expect(400);

//     // Assert that the response contains a success message
//     expect(response.body).toEqual("Registration successful" ); // Adjusted expectation for message from JSON response
//   });

//   it("should return 400 for existing user", async () => {
//     // Mock user data
//     const existingUser = { name: "ExistingUser", email: "existing@example.com", password: "password" };

//     // Insert a user with the same email as existingUser into the database
//     await userCollection.insertOne(existingUser);

//     // Send a register request with existing user's email
//     const response = await request(app)
//       .post("/register")
//       .send(existingUser)
//       .expect("Content-Type", /text/) // Adjusted expectation to JSON
//       .expect(400);

//     // Assert that the response contains an error message
//     expect(response.body).toEqual( "User already exists" ); // Adjusted expectation for message from JSON response
//   });
// });

describe("Profile Endpoint", () => {
  it("should return user profile when authorized", async () => {
    
    const userData = { name: "TestUser", email: "test@example.com", password: "password" };

   
    const token = jwt.sign(userData, secret);

    
    const response = await request(app)
      .get("/profile")
      .set("Cookie", `token=${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

   
    expect(response.body.name).toEqual(userData.name);
    expect(response.body.email).toEqual(userData.email);
    
  });
});
describe("Logout Endpoint", () => {
  it("should clear the token cookie and respond with 'ok'", async () => {
   
    const response = await request(app)
      .post("/logout")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual("ok");

    expect(response.headers["set-cookie"]).toContain("token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
  });
});
describe("Add Blog Endpoint", () => {
  it("should add a new blog post successfully", async () => {
   
    const blogData = { 
      title: "Test Blog Post", 
      preview: "This is a preview of the test blog post.", 
      content: "This is the content of the test blog post.", 
      userId: "user123", 
      tags: ["test", "blog", "example"] 
    };

    const response = await request(app)
      .post("/addblog")
      .send(blogData)
      .expect("Content-Type", /text/)
      .expect(200);

    expect(response.text).toEqual("Added successfully");
  });

  it("should return internal server error when an error occurs", async () => {
  
    const invalidBlogData = { 
      title: "Test Blog Post", 
      preview: "This is a preview of the test blog post.", 
      content: "This is the content of the test blog post.", 
      userId: "user123", 
      tags: ["test", "blog", "example"] 
    };

    jest.spyOn(blogCollection, "insertOne").mockImplementationOnce(() => { throw new Error("Database error"); });

    const response = await request(app)
      .post("/addblog")
      .send(invalidBlogData)
      .expect("Content-Type", /text/)
      .expect(500);

    expect(response.text).toEqual("Internal Server Error");
  });
});

