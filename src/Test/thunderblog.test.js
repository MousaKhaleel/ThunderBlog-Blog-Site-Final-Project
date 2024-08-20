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

// describe("Get History by User ID Endpoint", () => {
//   it("should return user's history when user ID is valid", async () => {

//     const userId = "65e35a887505aabde52fb3ef";

//     const userHistory = [ "6637bc2ed7701bd09f4cc677","65e4f27d5ab9f0e44af7e25d" ];

//     const mockUser = {
//       _id: userId,
//       History: userHistory
//     };

//     jest.spyOn(userCollection, "findOne").mockResolvedValue(mockUser);

//     const response = await request(app)
//       .get(`/history/${userId}`)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     expect(response.body).toEqual(userHistory);
//   });

//   it("should return 404 when user ID is not found", async () => {
//     const userId = "65e4f27d5ab9f0e44af7e25d";

//     jest.spyOn(userCollection, "findOne").mockResolvedValue(null);

//     await request(app)
//       .get(`/history/${userId}`)
//       .expect(404);
//   });
// });

describe("Delete History Endpoint", () => {
  it("should delete user history successfully", async () => {
    
    const userId = new ObjectId();

    const userWithHistory = {
      _id: userId,
      History: [new ObjectId(), new ObjectId()]
    };
    await userCollection.insertOne(userWithHistory);

    const response = await request(app)
      .delete(`/deletehistory/${userId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual({ success: true });

    const updatedUser = await userCollection.findOne({ _id: userId });
    expect(updatedUser.History).toEqual([]);
  });
});

describe("Change Password Endpoint", () => {
  it("should change user password successfully", async () => {
    
    const userId = new ObjectId();
    const newPassword = "newPassword123";

    const userWithPassword = {
      _id: userId,
      Password: "oldPassword123" 
    };
    await userCollection.insertOne(userWithPassword);

   
    const response = await request(app)
      .post("/changePassword")
      .send({ userId: userId, password: newPassword })
      .expect("Content-Type", /text/)
      .expect(200);

    expect(response.text).toEqual("password changed successfully");

    const updatedUser = await userCollection.findOne({ _id: userId });
    expect(updatedUser.Password).toEqual(newPassword);
  });
});

describe('Recommended Blogs Endpoint', () => {
  
  it('should return recommended blogs based on top tags', async () => {

    const sampleBlogs = [
      { title: 'Blog 1', content: 'Content 1', preview: 'Preview 1', AuthorID: 'author1', Tags: ['tag11', 'tag2'] },
      { title: 'Blog 2', content: 'Content 2', preview: 'Preview 2', AuthorID: 'author2', Tags: ['tag1', 'tag3'] },
      { title: 'Blog 3', content: 'Content 3', preview: 'Preview 3', AuthorID: 'author3', Tags: ['tag2', 'tag3'] }
    ];
    await blogCollection.insertMany(sampleBlogs);


    const response = await request(app)
      .post('/recommendedblogs')
      .send({ topTags: ['tag11'] })
      .expect('Content-Type', /json/)
      .expect(200);

    // expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('Blog 1');
  });

  it('should return an empty array if no blogs are found with top tags', async () => {
    
    const response = await request(app)
      .post('/recommendedblogs')
      .send({ topTags: ['nonexistenttag'] })
      .expect('Content-Type', /json/)
      .expect(200);

  
    expect(response.body).toHaveLength(0);
  });
});