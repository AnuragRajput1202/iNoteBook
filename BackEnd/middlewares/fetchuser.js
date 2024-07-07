require('dotenv').config();
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const fetchUser = (req, res, next) => {
    const token = req.header("auth-token")
    if (!token) {
        return res.status(401).end("Access Denied! Please authenticate using a valid token")
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
    } catch (error) {
        return res.status(401).end("Access Denied! Please authenticate using a valid token")
    }
    next()
}

module.exports = fetchUser