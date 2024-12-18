const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const username = 'admin123';
    const password = 'password123'; // Known password for initial admin

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Admin already exists with this username.');
      process.exit();
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    // Create and save the new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      role: 'admin', // Ensure the role is explicitly set to 'admin'
    });

    await newAdmin.save();
    console.log('Admin created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  } finally {
    mongoose.connection.close(); // Close the connection after operation
  }
};

createAdmin();
