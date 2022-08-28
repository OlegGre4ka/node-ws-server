const UserModel = require("./../models/UserModel");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const MailService = require("./mailService");
const TokenService = require("./tokenService");
const UserDto = require("./../dtos/UserDto");

class UserService {
    async registration(userName, email, password) {
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            throw new Error(`Користувач з поштовою адресою ${email} вже існує`)
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const activationLink = uuid.v4();
        // const userRole = await Role.findOne({value: "USER"})
        const user = await UserModel.create({ userName, email, password: hashPassword, activationLink/*, roles: [userRole.value]*/ })
        await MailService.sendActivationMail(email, activationLink);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.userId, tokens.refreshToken)
        
        return {
            tokens,
            user: userDto
        }
        // return res.json({message: "Пользователь успешно зарегистрирован"})
        // const user = await UserModel.crerate({userName, email, password})
    }
}

module.exports = new UserService();