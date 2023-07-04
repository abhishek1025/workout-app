const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })


//static signup method
userSchema.statics.signup = async function (email, password) {

    if (!email || !password) throw Error("All fields must be filed")

    if (!validator.isEmail(email)) throw Error("Email is not valid")

    const exists = await this.findOne({ email })

    if (exists) throw Error("Email already in use")

    if (!validator.isStrongPassword(password)) throw new Error("Password not strong enough")

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user;
}

//static login method
userSchema.statics.login = async function (email, password) {

    if (!email || !password) throw Error("All fields must be filed")

    const user = await this.findOne({ email })

    if (!user) throw Error("Incorrect Email")

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw Error('Incorrect Password')

    return user
}

//creates collection automatically
// using Workout collection, we can easily do the query on the DB
module.exports = mongoose.model('User', userSchema)

