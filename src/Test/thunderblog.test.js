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