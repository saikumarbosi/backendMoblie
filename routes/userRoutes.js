const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()

router.post('/login', userController.createUser)
router.get('/users', userController.getUsers)

module.exports = router