const {Schema, model} = require('mongoose')

const UserModel = new Schema({
    userName: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, default: false},
    dateActivated: {type: Number}
    // roles: [{type: String, ref: 'Role'}]
})

module.exports = model('User', UserModel)