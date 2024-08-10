const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        const user = await User.create({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        });
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const signIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const expiration = 1000 * 60 * 60 * 24;
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: expiration });
        res.cookie('Authorization', token, { 
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'Strict',
            maxAge: expiration,
        });
        res.status(200).json({ message: 'Signed in' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const signOut = async (req, res) => {
    try {
        res.clearCookie('Authorization');
        res.status(200).json({ message: 'Signed out' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const checkAuth = async (req, res) => {
    try {
        res.status(200).json({ message: 'User is authenticated' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'User is not authenticated' });
    }
};

module.exports = {
    signUp,
    signIn,
    signOut,
    checkAuth
};

