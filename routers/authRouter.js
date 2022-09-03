const Router = require('express')
const authRouter = new Router()
const authController = require('../controllers/authController')
const { body, check } = require("express-validator")
// const authMiddleware = require('./middlewaree/authMiddleware')
// const roleMiddleware = require('./middlewaree/roleMiddleware')

authRouter.post('/signup',
    body('userName').notEmpty().isString(),
    body('email', "Имя пользователя не может быть пустым").notEmpty().isEmail(),
    body('password').notEmpty().isString(),
    authController.registration)
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

authRouter.get('/refresh', authController.refresh)
authRouter.get('/activate/:link', authController.activateLink)
authRouter.get('/users', /*roleMiddleware(["ADMIN"]),*/ authController.getUsers)

module.exports = authRouter