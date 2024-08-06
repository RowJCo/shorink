const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signUp = async(require, response) => {
    try{
        const email = require.body.email;
        const password = require.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            email,
            password: hashedPassword,
        });
        response.sendStatus(200);
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
}

const signIn = async(require, response) => {
    try{
        const email = require.body.email;
        const password = require.body.password;
        const user = await User.findOne({email});
        if(!user){
            return response.sendStatus(400);
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch){
            return response.sendStatus(400);
        }
        const expiration = Date.now() + (1000*60*60*24);
        const token = jwt.sign({ subject:user._id, expiration}, process.env.JWT_SECRET);
        response.cookie('Authorisation', token, {
            httpOnly: true,
            expires: new Date(expiration),
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
        response.sendStatus(200);
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
}

const signOut = async(require, response) => {
    try{
        response.clearCookie('Authorisation');
        response.sendStatus(200);
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }

}

const checkAuth = async(require, response) => {
    try{
        console.log(require.user);
        response.sendStatus(200);
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
}

module.exports = {
    signUp,
    signIn,
    signOut,
    checkAuth,
}