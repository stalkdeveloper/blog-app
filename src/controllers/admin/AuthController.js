const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { validateAuthUser } = require('../../validations/admin/AuthValidation');
const standardResponse = require('../../utils/ApiJsonResponse');
const path = require('path');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;


exports.showRegister = async (req, res) => {
    try {
        if (req.user) {
            return res.redirect('/admin/dashboard');
        }
        res.render('auth/register');
    } catch (err) {
        console.error('Error showing registration page:', err);
        res.status(500).send('Server error');
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, confirmation_password } = req.body;
        const validationErrors = await validateAuthUser(req.body);
        
        if (Object.keys(validationErrors.errors).length > 0) {
            return res.status(400).json(standardResponse.errorResponse('Validation failed', validationErrors.errors));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Server error');
    }
};

exports.showLogin = async (req, res) => {
    try {
        if (req.user) {
            return res.redirect('/admin/dashboard');
        }
        res.render('auth/login', {
            layout: 'layouts/auth'
        });
    } catch (err) {
        console.error('Error showing login page:', err);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validationErrors = await validateAuthUser(req.body);
        if (Object.keys(validationErrors.errors).length > 0) {
            return res.status(400).json(standardResponse.errorResponse('Validation failed', validationErrors.errors));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(standardResponse.errorResponse('Invalid email or password'));
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json(standardResponse.errorResponse('Invalid email or password'));
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        return res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json(standardResponse.errorResponse('Server error'));
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

exports.profile = (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    res.render('auth/profile', {
        layout: 'layouts/admin'
    });
};
