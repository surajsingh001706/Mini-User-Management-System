require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/user.model');
const connectDB = require('./src/config/db');

const createAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'admin@example.com';
        const adminPassword = 'adminpassword123';

        // Check if admin already exists
        let admin = await User.findOne({ email: adminEmail });

        if (admin) {
            console.log('Admin user already exists');
            // Update role just in case
            admin.role = 'admin';
            admin.fullName = 'Admin User'; // Ensure fullName is set
            // admin.password = adminPassword; // Uncomment to reset password
            await admin.save();
            console.log('Admin user role verified/updated');
        } else {
            admin = await User.create({
                fullName: 'Admin User',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
                status: 'active'
            });
            console.log('Admin user created successfully');
        }

        console.log(`\nlogin with:\nEmail: ${adminEmail}\nPassword: ${adminPassword}\n`);
        process.exit();
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
