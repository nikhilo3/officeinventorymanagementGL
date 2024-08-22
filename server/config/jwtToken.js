import jwt from "jsonwebtoken";

const generateToken = (userid) => {

    const jwtsecret = process.env.JWTSECRET;

    const token = jwt.sign({ userid }, jwtsecret, { expiresIn: '3d' });

    return token;
}

export { generateToken }