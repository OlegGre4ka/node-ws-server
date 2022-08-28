const Router = require('express')
const authRouter = new Router()
const authController = require('../controllers/authController')
const {check} = require("express-validator")
// const authMiddleware = require('./middlewaree/authMiddleware')
// const roleMiddleware = require('./middlewaree/roleMiddleware')

authRouter.post('/signup', [
    check('userName', "Имя пользователя не может быть пустым").notEmpty(),
    check('email', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], authController.registration)
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

authRouter.get('/refresh', authController.refresh)
authRouter.get('/activate/:link', authController.activateLink)
authRouter.get('/users', /*roleMiddleware(["ADMIN"]),*/ authController.getUsers)

module.exports = authRouter