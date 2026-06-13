import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../service/mail.service.js";

export async function register(req,res){
    const {username , email , password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[{email},{username}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message : "User with this email or username already exists",
            sucess:false,
            err:"user already exists"
        })
    }

    const user = await userModel.create({email,username,password})

    const emailVerificationToken = jwt.sign({
        email : user.email,
    }, process.env.JWT_SECRET,{
        expiresIn:"1d"
    })

    await sendEmail({
        to:email,
        subject:"Welcome to Answerly !!",
        html:`<h1>Welcome to Answerly</h1>
        <p>Thank you for registering with us. Please verify your email by clicking the link below:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
        `
    })

    res.status(201).json({
        message:"User registered successsfully!",
        sucess:true,
        user:{
            id:user._id,
            email:user.email,
            username:user.username
        }
    })
}

export async function login(req,res){
        const {email,password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message:"Invalid email or password",
                sucess:false,
                err:"Invalid email or password"
            })
        }

        if(!user.verified){
            return res.status(400).json({
                message:"Please verify your email first",
                sucess:false,
                err:"Email not verified",
                verified:false
            })
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid email or password",
                sucess:false,
                err:"Invalid email or password"
            })
        }

        const token = jwt.sign({
            id:user._id,
            email:user.email,
        }, process.env.JWT_SECRET,{
            expiresIn:"1d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message:"Login successful",
            sucess:true,
            user
        })
    }

export async function getMe(req,res){
    const userId = req.user?.id || req.user?._id;
    if(!userId){
        return res.status(401).json({
            message:"Unauthorized",
            sucess:false,
            err:"No user ID found"
        })
    }

    const user = await userModel.findById(userId).select("-password")
    if(!user){
        return res.status(404).json({
            message:"User not found",
            sucess:false,
            err:"User not found"
        })
    }
    res.status(200).json({
        message:"User fetched successfully",
        sucess:true,
        user
    })
}


export async function verifyEmail(req,res){
    const {token} = req.query;

    if(!token){
        return res.status(400).json({
            message:"Token is required",
            sucess:false,
            err:"No token provided"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(400).json({
            message:"Invalid token",
            sucess:false,
            err:"Invalid token"
        })
    }

    const user = await userModel.findOne({email:decoded.email})

    if(!user){
        return res.status(400).json({
            message:"Invalid token",
            sucess:false,
            err:"Invalid token"
        })
    }
    user.verified = true;
    await user.save();

    const html =
            `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/login">Go to Login</a>
    `

        return res.send(html);
}