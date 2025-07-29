import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//import getDataUri from "../utils/datauri.js";

import cloudinary from "../utils/cloudinary.js";
import fs from 'fs'


export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      })
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded", success: false });
    }

    const filePath = req.file.path;
    // const fileUri = getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(fileUri.path);

    const cloudResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: "image", // Ensures it's handled as an image
      folder: "profile_photos", // Folder where images are stored
      transformation: [
          { width: 300, height: 300, crop: "fill", gravity: "face" } // Crop around face
      ],
  });
  

  // file deleted with asyncrounously

  // fs.unlink(filePath, (err) => {
  //   if (err) {
  //     console.error("Error deleting the file:", err);
  //   } else {
  //     console.log("Local file deleted successfully.");
  //   }
  // });

  fs.unlinkSync(filePath);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      })
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedpassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    })

    return res.status(201).json({
      message: "Account created successfully",
      success: true
    })
  }

  catch (error) {
    console.log(error)
  }
}




export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      })
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect paasord or email",
        success: false,
      })
    }
    //check role is correct or not 
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doeen't exist with current role",
        success: false,
      })
    }
    const tokenData = {
      userId: user._id
    }

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }
    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 100, httpOnly: true, sameSite: 'strict' }).json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true
    })


  }
  catch (error) {
    console.log(error)
  }
}



export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    })
  }
  catch (error) {
    console.log(error)
  }
}


export const updateprofile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;


    // cloudinary ayega idhar
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded", success: false });
    }

    const filePath = req.file.path;
    // const fileUri = getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(fileUri.path);

    const cloudResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw", // Important for PDF uploads
      folder: "pdf_files",
  });

  // file deleted with asyncrounously

  // fs.unlink(filePath, (err) => {
  //   if (err) {
  //     console.error("Error deleting the file:", err);
  //   } else {
  //     console.log("Local file deleted successfully.");
  //   }
  // });

  fs.unlinkSync(filePath);



    // if (!fullname || !email || !phoneNumber || !bio || !skills) {
    //   return res.status(400).json({
    //     message: "Something is missing",
    //     success: false,
    //   })
    // }




    let skillsArray
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;  //midleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false
      })
    }


    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray




   // resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url  // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname // Save the original file name
    }



    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNummber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    })

  }
  catch (error) {
    console.log(error, 'i a om')
  }
}