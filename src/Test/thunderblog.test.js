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