const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user.model');

beforeAll(async () => {
    // Connect to a test database or use a separate DB
    // For simplicity using the same URI but usually should be test DB
    process.env.MONGO_URI = 'mongodb://localhost:27017/mini_user_management_test';
    await mongoose.disconnect(); // Disconnect previous connection from app.js if any
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
});

describe('Auth Endpoints', () => {

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should login user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should fail login with wrong password', async () => {
        const res = await request(app) // 2. Login failure (wrong password)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(401);
    });

});

describe('User Endpoints', () => {
    let token;

    beforeAll(async () => {
        // Login to get token
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        token = res.body.token;
    });

    it('should reject access to protected route without token', async () => { // 3. JWT protected route rejection
        const res = await request(app).get('/api/users/me');
        expect(res.statusCode).toEqual(401);
    });

    it('should access protected route with token', async () => {
        const res = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.email).toEqual('test@example.com');
    });

    it('should fail password change with short password', async () => { // 5. Password change validation
        const res = await request(app)
            .put('/api/users/updatepassword')
            .set('Authorization', `Bearer ${token}`)
            .send({
                currentPassword: 'password123',
                newPassword: '123'
            });
        expect(res.statusCode).toEqual(400); // Validation error
    });
});

describe('Admin Endpoints', () => {
    let userToken;

    beforeAll(async () => {
        // Create another user
        await request(app)
            .post('/api/auth/signup')
            .send({
                fullName: 'Regular User',
                email: 'regular@example.com',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'regular@example.com',
                password: 'password123'
            });
        userToken = res.body.token;
    });

    it('should prevent non-admin from accessing admin routes', async () => { // 4. Admin-only route protection
        const res = await request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toEqual(403);
    });

});
