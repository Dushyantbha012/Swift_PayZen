const express = require("express")
const {User, Account} = require("../db/db")
const zod = require("zod")
const {JWT_SECRET} = require("../config")
const {authMiddleware} = require("./authMiddleware")
const userRouter = express.Router();
const jsonwebtoken = require("jsonwebtoken")
const signup = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

userRouter.post("/signup",async (req,res)=>{
    console.log("request reached"+req.body)
    const {success}= signup.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"incorrect inputs"
        })
        return;
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        res.status(411).json({
            message:"user already exists"
        })
        return;
    }
    const user = await User.create({
        username:req.body.username,
        firstName : req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
    })
    const userId = user._id
    await Account.create({
        userId,
        balance:1 + Math.random() * 10000,

    })

    const token = jsonwebtoken.sign({
        userId: userId
    },JWT_SECRET)
    res.json({
        message:"user created successfully",
        token:token
    })
    return;
})

const signin = zod.object({
    username:zod.string().email(),
    password:zod.string()
})
userRouter.post("/signin", async(req,res)=>{
    console.log("request reached signin ", req.body)
    const {success} = signin.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"incorrect inputs"
        })
        return;
    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(!user){
        res.status(404).json({
            message:"sign up",
        })
        return;
    }
    const token = jsonwebtoken.sign({
        userId: user._id
    },JWT_SECRET)
    res.json({
        message:"signed in successfully",
        token:token
    })
    return;
})
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

userRouter.put("/update",authMiddleware,async (req,res)=>{
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({_id: req.userId},req.body)

    res.json({
        message: "Updated successfully"
    })
})

userRouter.get("/bulk",authMiddleware,async(req,res)=>{
    const filter = req.query.filter||"";
    const users = await User.find({$or:[
        {firstName:{
            "$regex":filter
        }},{lastName:{
            "$regex":filter
        }}
    ]})
    res.json({
        user:users.map((user)=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports= userRouter;