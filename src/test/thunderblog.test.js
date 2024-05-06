const {MongoClient}=require('mongodb')
const request = require("supertest");
const app = require("../../server.js");

require("dotenv").config();

const jwt = require('jsonwebtoken')
const secret = 'bu43ry8477r8gbn4f3e834iu';
const {userCollection} = require('../../server.js');
const {blogCollection} = require('../../server.js');
console.log(typeof app);
// jest.mock('./server', () => {
//     const { MongoClient } = require('mongodb');
//     const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
//     const db = client.db('');
//     const userCollection = db.collection('test_users');
//     return { userCollection };
// });

it("it should pass lol", () =>{

})

describe('GET /allblogs', () => { //works
    it('responds with all blogs in the database', async () => {
      const response = await request(app).get('/allblogs');
  
      expect(response.status).toBe(200);
        
      expect(response.body).toBeDefined();
    });
});

// describe("GET /allblogs", () => {
//     it("should return all blogs", async () => {
//         return request(app)
//             .get("/allblogs")
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//             })
//     });
// });

// // describe('POST /login', () => {
// //     it('should log in the user with valid credentials', async () => {
// //       // Mock data for the request body
// //       const validCredentials = {
// //         email: 'example@example.com',
// //         password: 'password123'
// //       };
// //       const response = await request(app)
// //       .post('/login')
// //       .send(validCredentials);

// //     // Assertions
// //     expect(response.status).toBe(200);
// //     expect(response.headers['set-cookie']).toBeDefined(); // Check if token cookie is set
// //     expect(response.body).toBe('ok'); // Assuming your endpoint returns 'ok' on successful login
// //   });

// //   it('should return error for invalid credentials', async () => {
// //     // Mock data for the request body with invalid credentials
// //     const invalidCredentials = {
// //       email: 'example@example.com',
// //       password: 'wrongpassword'
// //     };

// //     // Send a POST request to the /login endpoint with invalid credentials
// //     const response = await request(app)
// //       .post('/login')
// //       .send(invalidCredentials);

// //     // Assertions
// //     expect(response.status).toBe(400);
// //     expect(response.body).toBe('Wrong info try again'); // Assuming your endpoint returns this message for invalid credentials
// //   });
// // });
// // describe('POST /login', () => {

// //     it('should log in the user with valid credentials', async () => {
  
// //     //   const validCredentials = {
// //     //     email: 'example@gmail.com',
// //     //     password: '1234'
// //     //   };
  
// //       // Send a POST request to the /login endpoint with valid credentials
// //       const response = await request(app)
// //         .post('/login')
// //         .send({
// //             email: "test@test.com",
// //             password: "1234"
// //         });
  
// //       // Assertions
// //       expect(response.statusCode).toBe(400);
// //       //expect(response.headers['set-cookie']).toBeDefined(); // Check if token cookie is set
// //       expect(response.body).toBe('Wrong info try again'); // Assuming your endpoint returns 'ok' on successful login
// //     });
  
// //     it('should return error for invalid credentials', async () => {
// //       // Mock data for the request body with invalid credentials
// //       const invalidCredentials = {
// //         email: 'example@example.com',
// //         password: 'wrongpassword'
// //       };
  
// //       // Send a POST request to the /login endpoint with invalid credentials
// //       const response = await request(app)
// //         .post('/login')
// //         .send(invalidCredentials);
  
// //       // Assertions
// //       expect(response.status).toBe(400);
// //       expect(response.body).toBe('Wrong info try again'); // Assuming your endpoint returns this message for invalid credentials
// //     });
// //   });
// // describe('POST /login', () => {
// //     beforeEach(async () => {
// //       await userCollection // Clear the user collection before each test
// //     });
  
// //     it('should return a token on successful login', async () => {
// //       const user = { email: 'test@example.com', password: 'password' };
// //       await userCollection.insertOne(user);
  
// //       const res = await request(app)
// //        .post('/login')
// //        .send({ email: user.email, password: user.password });
  
// //       expect(res.status).toBe(200);
// //       expect(res.body).toEqual({ message: 'Logged in successfully' });
// //       expect(res.headers['set-cookie'][0]).toContain('token=');
// //     });
  
// //     it('should return an error on invalid email or password', async () => {
// //       const res = await request(app)
// //        .post('/login')
// //        .send({ email: 'invalid@example.com', password: 'wrongpassword' });
  
// //       expect(res.status).toBe(400);
// //       //expect(res.body).toEqual({ error: 'Invalid email or password' });
// //     });
  
//     // it('should return an error on internal server error', async () => {
//     //   const res = await request(app)
//     //    .post('/login')
//     //    .send({ email: 'test@example.com', password: 'password' });
  
//     //   // Simulate an internal server error
//     //   jest.spyOn(userCollection, 'findOne').mockImplementation(() => {
//     //     throw new Error('Internal Server Error');
//     //   });
  
//     //   expect(res.status).toBe(500);
//     //   expect(res.body).toEqual({ error: 'Internal Server Error' });
//     // });
// //   });

// //   describe('POST /register', () => {
// //     it('should register a new user with valid credentials', async () => {
// //         // Mock data for the request body
// //         const validCredentials = {
// //             name: 'John Doe',
// //             email: 'johndoe@example.com',
// //             password: 'password123'
// //         };

// //         // Send a POST request to the /register endpoint with valid credentials
// //         const response = await request(app)
// //             .post('/register')
// //             .send(validCredentials);

// //         // Assertions
// //         expect(response.status).toBe(200);
// //         expect(response.text).toBe('Registration successful');
// //     });

// //     it('should return error for existing user', async () => {
// //         // Mock data for the request body with existing user's email
// //         const existingUserCredentials = {
// //             name: 'Jane Doe',
// //             email: 'janedoe@example.com',
// //             password: 'password123'
// //         };

// //         // Send a POST request to the /register endpoint with existing user's email
// //         const response = await request(app)
// //             .post('/register')
// //             .send(existingUserCredentials);

// //         // Assertions
// //         expect(response.status).toBe(400);
// //         expect(response.text).toBe('User already exists');
// //     });

// //     it('should return internal server error for unexpected error', async () => {
// //         // Mock data for the request body
// //         const invalidCredentials = {
// //             name: 'John Doe',
// //             email: 'johndoe@example.com',
// //             password: 'password123'
// //         };

// //         // Mocking a function that will throw an error
// //         jest.spyOn(app.locals.userCollection, 'findOne').mockRejectedValue(new Error('Unexpected error'));

// //         // Send a POST request to the /register endpoint with invalid credentials
// //         const response = await request(app)
// //             .post('/register')
// //             .send(invalidCredentials);

// //         // Assertions
// //         expect(response.status).toBe(500);
// //         expect(response.text).toBe('Internal Server Error');
// //     });
// // });
// const request = require('supertest');
// const app = require("../../server.js");
// describe('Testing Server Endpoints', () => {
//   let token = '';

//   // Login before running tests
//   beforeAll(async () => {
//     const response = await request(app)
//       .post('/login')
//       .send({ email: 'example@example.com', password: 'password' });
//     token = response.headers['set-cookie'][0].split(';')[0];
//   });

//   it('should return "server started" message', async () => {
//     const response = await request(app).get('/');
//     expect(response.statusCode).toBe(200);
//     expect(response.text).toBe('server started');
//   });

//   it('should register a new user', async () => {
//     const response = await request(app)
//       .post('/register')
//       .send({ name: 'Test User', email: 'test@example.com', password: 'testpassword' });
//     expect(response.statusCode).toBe(200);
//     expect(response.text).toBe('Registration successful');
//   });

//   it('should not allow registering an existing user', async () => {
//     const response = await request(app)
//       .post('/register')
//       .send({ name: 'Test User', email: 'test@example.com', password: 'testpassword' });
//     expect(response.statusCode).toBe(400);
//     expect(response.text).toBe('User already exists');
//   });

//   it('should add a new blog', async () => {
//     const response = await request(app)
//       .post('/addblog')
//       .set('Cookie', token)
//       .send({ title: 'Test Blog', preview: 'Preview content', content: 'Blog content', id: 'author_id' });
//     expect(response.statusCode).toBe(200);
//     expect(response.text).toBe('add successfully');
//   });

//   it('should get all blogs', async () => {
//     const response = await request(app).get('/allblogs');
//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body)).toBeTruthy();
//   });

//   // Add more tests for other endpoints as needed

//   // Logout after running tests
//   afterAll(async () => {
//     await request(app).post('/logout').set('Cookie', token);
//   });
// });