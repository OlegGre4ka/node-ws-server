const { validationResult } = require('express-validator');
const UserService = require("../services/userService");
const ApiError = require("./../middlewares/errorMiddleWare");
// const generateAccessToken = (id, roles) => {
//     const payload = {
//         id,
//         roles
//     }
//     return jwt.sign(payload, secret, {expiresIn: "24h"} )
// }

class authController {
    async registration(req, res, next) {
        try {
            console.log(req.body, "req.body-registration");
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Помилка при валідації", errors.array()))
            }
            const { userName, email, password } = req.body;
            const userData = await UserService.registration(userName, email, password);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json({ data: { ...userData } })

            // const userRole = await Role.findOne({value: "USER"})
            // const user = new User({userName, email, password: hashPassword, roles: [userRole.value]})
        } catch (e) {
            console.log(e, "reg-error in catch");
            next(e);
        }
    }

    async activateLink(req, res, next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async login(req, res, next) {
        console.log(req.body, "req.body-login")
        try {
            const { email, password } = req.body
            const userData = await UserService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json({ data: { ...userData } })
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async logout(req, res, next) {
        console.log(req.body, req.cookies, "req.cookies-logout")
        try {
            const { refreshToken } = req.body;
            // const { refreshToken } = req.cookies;
            await UserService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.status(200).json("The session is over")
        } catch (e) {
            console.log(e)
            next(e);
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
            return res.status(200).json({ data: req.body })
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            // const users = await User.find()
            // res.json(users)
            res.json("list of users, response success")
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

module.exports = new authController()