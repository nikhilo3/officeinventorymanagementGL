import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const verifytoken = async (req, res, next) => {
    let token;

    console.log(req.cookies);


    if (!token && req.cookies) {
        token = req.cookies.authToken
        console.log('cookieToken=', token);
    }

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        console.log("headerToken=", token);
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWTSECRET);
            console.log('decoded=', decoded);
            const user = await User.findById(decoded.userid);
            console.log(user);

            req.user = user;
            next();

        } catch (error) {
            return res.status(401).json({ message: "Unauthorized token" });
        }
    } else {
        return res.status(401).send({ message: 'No token provided login first' })
    }
}

export { verifytoken }