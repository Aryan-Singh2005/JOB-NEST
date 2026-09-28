import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) =>{
    try {
        const{ fullname, email, phoneNumber, password, role} = req.body;
        if (!fullname || !email || phoneNumber || !password || !role){
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            });
        }
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            });
        }
        // convert passwords to hashes
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(200).json({
            message: `Account created succesfully $(fullname)`,
            success: true,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error registering user",
            success: false,
        });
    }
};

export const login = async (req,res) => {
    try {
        const {email, password, role}= req.body;
        if (!email || !password || !role) {
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const isMatch =  await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                message: "Incorrect email or password",
            });
        }
        //check role correctly or not
        if (user.role !== role) {
            return res.sstatus(403).json({
                message: "you don't have the necessary role to access this resource",
                success: false,
            });
        }

        // generate token 
        const tokenData= {
            userId: user._id,
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET,{
             expiresIn: "1d",
            });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile, 
        };
                                                            // one multiply by 24 hr * 60min * 60 sec * 1000 milsec
            return res.status(200).cookie("token",token,{maxAge: 1*24*60*60*1000,
                httpOnly: true,
                sameSite: strict
        })
        .json({
            message: `Welcome back $(user.fullname)`,
            user,
            success: true,
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};

export const logout = (req, res)=> {
    try{
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out successfully",
            success:true,
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error login failed",
            successs: false,
        });
    }
};

export const updateProfile = async (req,res)=> {
    try{
        const{fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.files;
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            });
        }

          //cloudinary upload





        const skillsArray = skills.split(",");
        const userId = req.id;    //middleware authentication
        let user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        user.fullname = fullname;
        user.email= email;
        user.phoneNumber = phoneNumber;
        user.bio = bio;
        user.skills = skillsArray;
        //resume
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated succesfully",
            user,
            success: true,
        });
        
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Server Error updating profile",
            success: false,
        });
    }
};