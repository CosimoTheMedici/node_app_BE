const {genSaltSync,hashSync,compareSync} = require("bcrypt");
var generator = require('generate-password');
const UserModel = require('../models/authModel')
const { v1: uuidv1 } = require('uuid');
const jwt = require('jsonwebtoken');
const { sendEmailWithAttachment } = require("../middleware/systemMailer");
const { createPDF,generateReceipts, generatecustomReceipt } = require("../middleware/pdfCreator");
const { sendResponse } = require("../middleware/response");
require('dotenv').config();


// Helper function to omit sensitive fields
const sanitizeUser = (user) => {
  const { password, refreshToken, salt, ...safeUser } = user || {};
  return safeUser;
};

exports.createNewUser = (email, category) => {
  const password = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true
  });

  const salt = genSaltSync(10);
  const hashPassword = hashSync(password, salt);

  const payload = {
    password: hashPassword,
    uuid: uuidv1(),
    email,
    user_category: category,
    business_id: 4,
    status: 1,
    salt,
    refreshToken: ""
  };

  return { payload, password };
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 0, 'Email and password are required', 400);
    }

    const user = await UserModel.findByEmail(email);
    
    if (!user) {
      return sendResponse(res, 0, 'Invalid email or password', 401);
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, 0, 'Invalid email or password', 401);
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
        status: user.status,
        user_category: user.user_category,
        uuid: user.uuid,
        business_id: user.business_id
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '9h' }
    );

    await UserModel.updateRefreshToken(refreshToken, user.email);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    return sendResponse(res, 1, 'Login successful', 200, {
      accessToken,
      user: sanitizeUser(user)
    });

  } catch (error) {
    console.error('Login error:', error);
    return sendResponse(res, 0, 'Server error', 500);
  }
};

exports.createEmployeeUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const salt = genSaltSync(10);
    userData.password = hashSync(password, salt);

    const result = await UserModel.createUser(userData);
    
    return sendResponse(res, 1, 'User created successfully', 201, {
      userId: result.insertId
    });

  } catch (error) {
    console.error('Create user error:', error);
    return sendResponse(res, 0, 'Failed to create user', 500);
  }
};

exports.getUsersData = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    const sanitizedUsers = users.map(user => sanitizeUser(user));
    
    return sendResponse(res, 1, 'Users retrieved successfully', 200, {
      users: sanitizedUsers
    });

  } catch (error) {
    console.error('Get users error:', error);
    return sendResponse(res, 0, 'Failed to retrieve users', 500);
  }
};

exports.testing = (req, res) => {
  return sendResponse(res, 1, 'Server working', 200);
};