const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    createdOn: { type: Date, default: new Date().getTime() }

})

module.exports = mongoose.model("User", userSchema)