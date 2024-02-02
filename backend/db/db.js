const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://dushyantbha012:Moderndps%401@cluster0.emmqofc.mongodb.net/")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName:{
        type:String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    lastName:{
        type:String,
        trim: true,
        maxLength: 50

    },
    password:{
        type:String,
        minLength:8,
    },
})

const User= mongoose.model("User",userSchema)

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    balance:{
        type:Number,
        required:true
    }
})

const Account = mongoose.model("Account",accountSchema);

module.exports = {
	User,Account
};