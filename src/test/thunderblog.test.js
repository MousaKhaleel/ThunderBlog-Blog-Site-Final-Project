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

describe('Add Blog Endpoint', () => {
  

  it('should add a new blog successfully', async () => {
    // Mock blog data
    const newBlogData = {
      title: 'Test Blog',
      preview: 'This is a test blog preview',
      content: 'This is the content of the test blog',
      userId: 'user123',
      tags: ['test', 'blog']
    };

    // Send a POST request to add a new blog
    const response = await request(app)
      .post('/addblog')
      .send(newBlogData)
      .expect(200);

    // Assert that the response indicates success
    expect(response.text).toBe('Added successfully');
  });

  it('should return 400 Bad Request if required fields are missing', async () => {
    // Missing title field
    const invalidBlogData = {
      preview: 'This is a test blog preview',
      content: 'This is the content of the test blog',
      userId: 'user123',
      tags: ['test', 'blog']
    };

    // Send a POST request with missing required fields
    await request(app)
      .post('/addblog')
      .send(invalidBlogData)
      .expect(400);
  });

  it('should return 500 Internal Server Error if database operation fails', async () => {
    // Mock blog data
    const newBlogData = {
      title: 'Test Blog',
      preview: 'This is a test blog preview',
      content: 'This is the content of the test blog',
      userId: 'user123',
      tags: ['test', 'blog']
    };

    // Mocking the blogCollection.insertOne method to throw an error
    blogCollection.insertOne = jest.fn().mockRejectedValue(new Error('Database error'));

    // Send a POST request to add a new blog
    await request(app)
      .post('/addblog')
      .send(newBlogData)
      .expect(500);
  });
});
// describe("Get History by User ID Endpoint", () => {
//   it("should return user's history when user ID is valid", async () => {
//     // Mock user ID
//     const userId = "validUserId";

//     // Mock user history data
//     const userHistory = [ /* Array of blog IDs representing user's history */ ];

//     // Mock database query response
//     const mockUser = {
//       _id: userId,
//       History: userHistory
//     };

//     // Mock the findOne method of userCollection
//     jest.spyOn(userCollection, "findOne").mockResolvedValue(mockUser);

//     // Send a GET request to the history endpoint with the user ID
//     const response = await request(app)
//       .get(`/history/${userId}`)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     // Assert that the response contains the user's history
//     expect(response.body).toEqual(userHistory);
//   });

//   it("should return 404 when user ID is not found", async () => {
//     // Mock non-existent user ID
//     const userId = "invalidUserId";

//     // Mock the findOne method of userCollection to return null (user not found)
//     jest.spyOn(userCollection, "findOne").mockResolvedValue(null);

//     // Send a GET request to the history endpoint with the invalid user ID
//     await request(app)
//       .get(`/history/${userId}`)
//       .expect(404);
//   });
// });

describe("Delete History Endpoint", () => {
  it("should delete user history successfully", async () => {
    // Mock a user ID
    const userId = new ObjectId();

    // Set up initial state: Insert a user document with history
    const userWithHistory = {
      _id: userId,
      History: [new ObjectId(), new ObjectId()] // Assuming History contains ObjectIDs
    };
    await userCollection.insertOne(userWithHistory);

    // Make a DELETE request to the endpoint
    const response = await request(app)
      .delete(`/deletehistory/${userId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    // Assert that the response contains the expected success message
    expect(response.body).toEqual({ success: true });

    // Optionally, verify the database state: Check if the user's history is empty
    const updatedUser = await userCollection.findOne({ _id: userId });
    expect(updatedUser.History).toEqual([]);
  });
});

describe("Change Password Endpoint", () => {
  it("should change user password successfully", async () => {
    // Mock a user ID and new password
    const userId = new ObjectId();
    const newPassword = "newPassword123";

    // Set up initial state: Insert a user document with the original password
    const userWithPassword = {
      _id: userId,
      Password: "oldPassword123" // Assuming the original password
    };
    await userCollection.insertOne(userWithPassword);

    // Make a POST request to the endpoint
    const response = await request(app)
      .post("/changePassword")
      .send({ userId: userId, password: newPassword })
      .expect("Content-Type", /text/)
      .expect(200);

    // Assert that the response contains the expected success message
    expect(response.text).toEqual("password changed successfully");

    // Optionally, verify the database state: Check if the user's password is updated
    const updatedUser = await userCollection.findOne({ _id: userId });
    expect(updatedUser.Password).toEqual(newPassword);
  });
});
describe('Unit Test: Recommended Blogs Endpoint', () => {
  

  it('should return recommended blogs based on top tags', async () => {
    // Insert some sample blogs into the database
    const sampleBlogs = [
      { title: 'Blog 1', content: 'Content 1', preview: 'Preview 1', AuthorID: 'author1', Tags: ['tag1', 'tag2'] },
      { title: 'Blog 2', content: 'Content 2', preview: 'Preview 2', AuthorID: 'author2', Tags: ['tag1', 'tag3'] },
      { title: 'Blog 3', content: 'Content 3', preview: 'Preview 3', AuthorID: 'author3', Tags: ['tag2', 'tag3'] }
    ];
    await blogCollection.insertMany(sampleBlogs);


    const response = await request(app)
      .post('/recommendedblogs')
      .send({ topTags: ['tag1', 'tag2'] })
      .expect('Content-Type', /json/)
      .expect(200);

    // Check if the response contains the expected blogs
    // expect(response.body).toHaveLength(1); // Only one blog should be recommended based on top tags
    // expect(response.body[0].title).toBe('Blog 1'); // The recommended blog should have title 'Blog 1'
  });

  it('should return an empty array if no blogs are found with top tags', async () => {
    // Send a request with top tags that do not match any blogs
    const response = await request(app)
      .post('/recommendedblogs')
      .send({ topTags: ['nonexistenttag'] })
      .expect('Content-Type', /json/)
      .expect(200);

    // Check if the response is an empty array
    expect(response.body).toHaveLength(0);
  });
});