const { Router } = require('express')
const {userCreator, getAllUsers, getUserDetail} = require('./utils')
const router = Router();

module.exports = router