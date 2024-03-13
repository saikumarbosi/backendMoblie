const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')
dotEnv.config()
const screateKey = process.env.myScreateKey

const createUser = async(req, res) => {
    try{
        const {username, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({username, password: hashedPassword})
        await user.save()
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            res.status(401).json({message: "Invalid username or password"}) 
        }

        const token = jwt.sign({userId: user._id}, screateKey)
        res.json({
            username: user.username,
            password: user.password,
            token
        })
    }
    catch(e){
        console.log("Error Found:", e)
        res.status(500).json({message: "Server Error"})
    }
}

const getUsers = async(req, res) => {
    try{
    const user = await User.find()
    res.status(200).json(user)
    }
    catch(e){
        console.log("Error Found:", e)
        res.status(500).json({message: "Server Error"})
    }
}

module.exports = {createUser, getUsers}