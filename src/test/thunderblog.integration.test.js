const request = require('supertest');

const { app, userCollection, blogCollection } = require('../../server.js');


  //describe('Integration Tests', () => {
    // describe('User Registration and Login Flow', () => {
    //   it('should register a new user and login successfully', async () => {
    //     const newUser = { name: 'Test User', email: 'test@example.com', password: 'password' };
  
    //     // Test user registration
    //     const registrationResponse = await request(app)
    //       .post('/register')
    //       .send(newUser)
    //       .expect(200);
  
    //     console.log('Registration response:', registrationResponse.body);
  
    //     // Test user login
    //     const loginResponse = await request(app)
    //       .post('/login')
    //       .send({ email: 'test@example.com', password: 'password' })
    //       .expect(200);
  
    //     console.log('Login response:', loginResponse.body);
    //   });
    // });
  
  

  // describe('Blog Management', () => {
  //   it('should add a new blog when all required fields are provided', async () => {
  //     const newBlogData = {
  //       title: 'Test Blog',
  //       preview: 'Test Preview',
  //       content: 'Test Content',
  //       userId: 'user_id',
  //       tags: ['tag1', 'tag2']
  //     };
  
  //     // Send a POST request to the addblog endpoint with the new blog data
  //     const response = await request(app)
  //       .post('/addblog')
  //       .send(newBlogData)
  //       .expect(200);
  
  //     // Assert that the response body contains the success message
  //     expect(response.text).toBe('Added successfully');
  //     console.log('Number of blogs after insertion:', blogLen);
  //     console.log('Last blog inserted:', blogs[blogLen - 1]);
    
  //     // Assert that the new blog has been added to the database
  //     const blogs = await blogCollection.find({}).toArray();
  //     const blogLen = blogs.length;
  //     expect(blogs.length).toBe(blogLen);
  //     expect(blogs[blogLen-1].title).toBe(newBlogData.title);
  //     expect(blogs[blogLen-1].content).toBe(newBlogData.content);
  //     expect(blogs[blogLen-1].preview).toBe(newBlogData.preview);
  //     expect(blogs[blogLen-1].userID).toBe(newBlogData.userId);
  //     expect(blogs[blogLen-1].tags).toEqual(expect.arrayContaining(newBlogData.tags));
  //   });
  
  //   it('should return 400 when any required field is missing', async () => {
  //     // Omit one of the required fields from the new blog data
  //     const invalidBlogData = {
  //       title: 'Test Blog',
  //       preview: 'Test Preview',
  //       // Missing content, userId, and tags
  //     };
  
  //     // Send a POST request to the addblog endpoint with the incomplete blog data
  //     const response = await request(app)
  //       .post('/addblog')
  //       .send(invalidBlogData)
  //       .expect(400);
  
  //     // Assert that the response body contains the error message
  //     expect(response.text).toBe('Missing required fields');
  
  //     // Assert that no new blog has been added to the database
  //     const blogs = await blogCollection.find({}).toArray();
  //     const blogLen = blogs.length;
  //     expect(blogs.length).toBe(blogLen);
  //   });
  // });
  //   // Add more tests for other blog management endpoints
   //});

  // // Add more describe blocks for other test scenarios (User History, Password Management, etc.)

