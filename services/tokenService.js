const jwt = require("jsonwebtoken");
const TokenModel = require("./../models/TokenModel");

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"});

        return{ accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await TokenModel.findOne({user: userId});
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            tokenData.save();
        }
        const token = await TokenModel.create({userId, refreshToken});
        
        return token;
    }

    async removeToken(refreshToken){
        const tokenData = await TokenModel.deleteOne({refreshToken});
        return tokenData

    }
}

module.exports = new TokenService();