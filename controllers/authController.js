// const User = require('../models/UserModel')
// const Role = require('../models/Role')
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator')
// const {secret} = require("../config")

// const generateAccessToken = (id, roles) => {
//     const payload = {
//         id,
//         roles
//     }
//     return jwt.sign(payload, secret, {expiresIn: "24h"} )
// }
// const UserService = require("../services/userService");

class authController {
    async registration(req, res, next) {
        try {
        console.log(req.body, "req.body-registration");
        // const {userName, email, password} = req.body;
        // const userData = await UserService.registration(userName, email, password);
        // res.cookie("refreshToken",userData.refreshToken,{maxAge: 30*24*60*60*1000,httpOnly: true})
            // const errors = validationResult(req)
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({message: "Ошибка при регистрации", errors})
            // }

            // const userRole = await Role.findOne({value: "USER"})
            // const user = new User({userName, email, password: hashPassword, roles: [userRole.value]})
            // return res.status(200).json({data:{...userData, status: 200}})
            return res.status(200).json({data:{...req.body, status: 200}})
        } catch (e) {
            console.log(e, "reg-error in catch")
            res.status(400).json({message: `Registration ${e}`, status: 400})
        }
    }

    async login(req, res, next) {
        console.log(req.body, "req.body-login")
        try {
            // const {email, password} = req.body
            // const user = await User.findOne({email})
            // if (!user) {
            //     return res.status(400).json({message: `Пользователь ${userName} не найден`})
            // }
            // const validPassword = bcrypt.compareSync(password, user.password)
            // if (!validPassword) {
            //     return res.status(400).json({message: `Введен неверный пароль`})
            // }
            // const token = generateAccessToken(user._id, user.roles)
            // return res.json({token})
            return res.status(200).json({data: {...req.body, status: 200}})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error', status: 400})
        }
    }

    async logout(req, res, next) {
        console.log(req.body, "req.body-login")
        try {
            // const {userName, password} = req.body
            // const user = await User.findOne({userName})
            // if (!user) {
            //     return res.status(400).json({message: `Пользователь ${userName} не найден`})
            // }
            // const validPassword = bcrypt.compareSync(password, user.password)
            // if (!validPassword) {
            //     return res.status(400).json({message: `Введен неверный пароль`})
            // }
            // const token = generateAccessToken(user._id, user.roles)
            // return res.json({token})
            return res.status(200).json({data:req.body})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async refresh(req, res, next) {
        console.log(req.body, "req.body-login")
        try {
            // const {userName, password} = req.body
            // const user = await User.findOne({userName})
            // if (!user) {
            //     return res.status(400).json({message: `Пользователь ${userName} не найден`})
            // }
            // const validPassword = bcrypt.compareSync(password, user.password)
            // if (!validPassword) {
            //     return res.status(400).json({message: `Введен неверный пароль`})
            // }
            // const token = generateAccessToken(user._id, user.roles)
            // return res.json({token})
            return res.status(200).json({data:req.body})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async activateLink(req, res, next) {
        try {
            // const users = await User.find()
            // res.json(users)
            res.json("list of users, response success")
        } catch (e) {
            console.log(e)
        }
    }
    async getUsers(req, res, next) {
        try {
            // const users = await User.find()
            // res.json(users)
            res.json("list of users, response success")
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()