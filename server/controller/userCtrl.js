import User from "../models/userModel.js"
import express from "express"
import bcrypt from "bcrypt"
import { generateToken } from "../config/jwtToken.js";

const userroutes = express.Router();


//create user
userroutes.post('/create', async (req, res) => {
    try {
        const { username, email, password, phonenumber } = req.body;

        const user = await User.findOne({ email: email });

        if (user) {
            throw new Error('User already registerd');
        }

        const securePass = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            email,
            password: securePass,
            phonenumber
        })

        await newUser.save();

        return res.status(200).json({ success: true, user: newUser })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})


userroutes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error('user not found');
        }

        const matchpass = await bcrypt.compare(password, user.password)

        if (matchpass) {
            const authToken = generateToken(user?._id);

            res.cookie('authToken', authToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000
            })

            return res.status(200).json({
                success: true, message: "login successfull",
                authToken: authToken
            })
        } else {
            throw new Error('password incorrect')
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})


userroutes.post('/logout', async (req, res) => {
    try {
        const cookies = req.cookies
        if(!cookies.authToken){
            return res.status(401).json({ success: false, message: "you are not logged in" });
        }

        res.clearCookie('authToken',{
            httpOnly:true,
            secure:true
        })
        return res.json({ success: true, message: "logout successfully" });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})

export default userroutes