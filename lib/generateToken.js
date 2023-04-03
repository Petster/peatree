import jwt from 'jsonwebtoken';

const generateToken = (id, isAdmin) => {
    return jwt.sign({id: id, isAdmin: isAdmin}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export default generateToken;