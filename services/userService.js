const UserModel = require("./../models/UserModel");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const MailService = require("./mailService");
const TokenService = require("./tokenService");
const UserDto = require("./../dtos/UserDto");
const ApiError = require("./../exceptions/apiError");

class UserService {
    async registration(userName, email, password) {
        const candidate = await UserModel.findOne({ email: email.toLowerCase() })
        if (candidate) {
            throw ApiError.BadRequest(`Користувач з поштовою адресою ${email} вже існує`)
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const activationLink = uuid.v4();
        // const userRole = await Role.findOne({value: "USER"})
        const user = await UserModel.create({ userName, email: email.toLowerCase(), password: hashPassword, activationLink/*, roles: [userRole.value]*/ });
        await MailService.sendActivationMail(email, `${process.env.API_URL}auth/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({ ...userDto });
        await TokenService.saveToken(userDto.userId, tokens.refreshToken)

        return {
            tokens,
            // user: userDto
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) throw ApiError.BadRequest("Некоректний лінк активації");
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email: email.toLowerCase() })
        if (!user) {
            throw ApiError.BadRequest(`Користувача з такими даними не було знайдено`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest("Введено невірний пароль")
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({ ...userDto });
        // await TokenService.saveToken(userDto.userId, tokens.refreshToken)

        return {
            tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

}

module.exports = new UserService();