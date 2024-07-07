const express = require('express')
require('dotenv').config();
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET =process.env.JWT_SECRET
const fetchUser = require('../middlewares/fetchuser')

// ROUTE 1: to create a user using post "/api/auth/createuser". No login needed
router.post('/createuser', [
    body('name', 'Invalid name! Minimum 3 characters are required').isLength({ min: 3 }),
    body('email', 'Invalid email! Please provide email in user@example.com format').isEmail(),
    body('password', 'Invalid password! Minimum 5 characters are required').isLength({ min: 5 })
], async (req, res) => {
    //if there are errors, return bad request and highlight the errors
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //checking whether user with given email already exists or not
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false 
            return res.status(404).json({ success, error: "User with this email already exists. Please provide a unique email ID" })
        }
    //encrypting the password
        const salt = await bcryptjs.genSalt(10)
        const securedPassword = await bcryptjs.hash(req.body.password, salt)
    //if not found then create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, token})
    }
    catch(error){
        console.error(error.message)
        res.status(500).end("Internal server error")
    }
    
})

//ROUTE 2: Authenticating a login request from user "/api/auth/login". 
router.post('/login', [
    body('email', 'Invalid email! Please provide email in user@example.com format').isEmail(),
    body('password', 'Invalid password! Minimum 5 characters are required').isLength({ min: 5 })
], async (req, res)=>{
    let success = false
    //if there are errors, return bad request and highlight the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //Authenticating email and password. Miscellaneous error handling
    try {
        const {email, password} = req.body
        let user = await User.findOne({email})
        if(!user){
            success = false
            return res.status(404).json({ success, error: "Wrong credentials! Please try Again"})
        }
        let comparePassword = await bcryptjs.compare(password, user.password)
        if(!comparePassword){
            success = false
            return res.status(404).json({ success, error: "Wrong credentials! Please try Again"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, token})
    } catch (error) {
        console.error(error.message)
        res.status(500).end("Internal server error")
    }
})
//ROUTER3: fetching user details after authentication "/api/auth/fetchuser". login is required
router.post('/fetchuser', fetchUser, async (req,res)=>{
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.json({user})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).end("Internal server error")
    }
})

module.exports = router