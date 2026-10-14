import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

export const register = async (req, res) =>{
    try {
        const{ fullname, email, phoneNumber, password, role} = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role){
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            });
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto: cloudResponse.secure_url,
            }
        });

        await newUser.save();

        return res.status(200).json({
            message: `Account created succesfully ${fullname}`,
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
        const isMatch =  await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                message: "Incorrect email or password",
            });
        }
        if (user.role !== role) {
            return res.status(403).json({
                message: "you don't have the necessary role to access this resource",
                success: false,
            });
        }

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
            
            return res.status(200).cookie("token",token,{maxAge: 1*24*60*60*1000,
                httpOnly: true,
                sameSite: "Strict"
        })
        .json({
            message: `Welcome back ${user.fullname}`,
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
            success: false,
        });
    }
};

export const updateProfile = async (req,res)=> {
    try{
        const{fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        
          let cloudinaryResponse;
          if(file){
            const fileUri = getDataUri(file);
            cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type:"raw",
        });
    }
        
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id;    
        let user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        if (fullname) {
            user.fullname = fullname;
        }
        if (email) {
            user.email = email;
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }
        if (bio) {
            user.profile.bio = bio;
        }
        if (skills) {
            user.profile.skills = skillsArray;
        }
        
        if(cloudinaryResponse){
            user.profile.resume = cloudinaryResponse.secure_url;
            user.profile.resumeOriginalname = file.originalname;
        }

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

// Toggle Save/Unsave Job
export const toggleSaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isSaved = user.savedJobs.includes(jobId);

        if (isSaved) {
            user.savedJobs.pull(jobId);
            await user.save();
            return res.status(200).json({ success: true, message: "Job removed from saved list", saved: false });
        } else {
            user.savedJobs.push(jobId);
            await user.save();
            return res.status(200).json({ success: true, message: "Job saved successfully", saved: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error toggling saved job" });
    }
};

// Get Saved Jobs for logged-in user
export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).populate({
            path: 'savedJobs',
            populate: {
                path: 'company'
            }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, savedJobs: user.savedJobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error fetching saved jobs" });
    }
};