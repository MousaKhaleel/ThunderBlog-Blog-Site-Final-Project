const {MongoClient}=require('mongodb')
const request = require("supertest");
const { ObjectId } = require('mongodb');

require("dotenv").config()

const jwt = require('jsonwebtoken')
const secret = 'bu43ry8477r8gbn4f3e834iu';

const { app, userCollection, blogCollection } = require("../../server.js");
const { Cookie } = require('express-session');

console.log(typeof app);
console.log(typeof userCollection);
console.log(typeof blogCollection);


it("check server", () =>{

})

describe('GET /allblogs', () => {
  it('responds with all blogs in the database', async () => {
    const response = await request(app).get('/allblogs');

    expect(response.status).toBe(200);
      
    expect(response.body).toBeDefined();
  });
});

describe("Login Endpoint", () => {
  it("should log in user with valid credentials", async () => {
    
    const userData = { email: "test@example.com", password: "password" };

    await userCollection.insertOne(userData);

   
    const response = await request(app)
      .post("/login")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("token");
  });

  it("should return 400 for invalid credentials", async () => {
    
    const response = await request(app)
      .post("/login")
      .send({ email: "invalid@example.com", password: "invalid" })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toEqual("Wrong info try again");
  });
});

// describe("Register Endpoint", () => {
//   it("should register a new user", async () => {
//     const userData = { name: "TestUser", email: "test@example.com", password: "password" };

//     const response = await request(app)
//       .post("/register")
//       .send(userData)
//       .expect("Content-Type", /text/)
//       .expect(200);

//     expect(response.text).toEqual("Registration successful");
//   });

//   it("should return 400 for existing user", async () => {
//     const existingUser = { name: "ExistingUser", email: "existing@example.com", password: "password" };

//     await userCollection.insertOne(existingUser);

//     const response = await request(app)
//       .post("/register")
//       .send(existingUser)
//       .expect("Content-Type", /text/)
//       .expect(400);

//     expect(response.text).toEqual("User already exists");
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

describe('Add Blog Endpoint', () => {
  
  it('should add a new blog successfully', async () => {

    const newBlogData = {
      title: 'Test Blog',
      preview: 'This is a test blog preview',
      content: 'This is the content of the test blog',
      userId: 'user123',
      tags: ['music', 'health']
    };

    const response = await request(app)
      .post('/addblog')
      .send(newBlogData)
      .expect(200);

    expect(response.text).toBe('Added successfully');
  });

  it('should return 400 if required fields are missing', async () => {

    const invalidBlogData = {
      preview: 'This is a test blog preview',
      content: 'This is the content of the test blog',
      userId: 'user123',
      tags: ['music', 'health']
    };

    await request(app)
      .post('/addblog')
      .send(invalidBlogData)
      .expect(400);
  });

  it('should return 500 Internal Server Error if database operation fails', async () => {
    
    const newBlogData = {
      title: 'Test Blog',
      preview: 'This is a test blog preview',
      content: 'This is the content of the test blog',
      userId: 'user123',
      tags: ['music', 'health']
    };

    
    blogCollection.insertOne = jest.fn().mockRejectedValue(new Error('Database error'));

    await request(app)
      .post('/addblog')
      .send(newBlogData)
      .expect(500);
  });
});