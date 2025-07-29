import cloudinary from "../utils/cloudinary.js";
import fs from 'fs'
import Company from '../models/company.model.js'

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required i am om",
        success: false
      })
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register with same company",
        success: false,
      })
    }
    company = await Company.create({
      name: companyName,
      userId: req.id
    })
    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true
    })

  }
  catch (error) {
    console.log(error)
  }
}

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //loggedin user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      })
    }
    return res.status(200).json({
      companies,
      success: true
    })

  }
  catch (error) {
    console.log(error);
  }
}

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      })
    }
    return res.status(200).json({
      company,
      success: true
    })
  }
  catch (error) {
    console.log(error);
  }
}

// export const updateCompany = async (req, res) => {
//   try {
//     const { name, description, website, location } = req.body;
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded", success: false });
//     }
//     //idhr cloudinary 

//     const filePath = req.file.path;
//     // const fileUri = getDataUri(file);
//     // const cloudResponse = await cloudinary.uploader.upload(fileUri.path);

//     const cloudResponse = await cloudinary.uploader.upload(filePath, {
//       resource_type: "image", // Ensures it's handled as an image
//       folder: "company_logo", // Folder where images are stored
//       transformation: [
//         { width: 300, height: 300, crop: "fill", gravity: "face" } // Crop around face
//       ],
//     });


//     // file deleted with asyncrounously

//     // fs.unlink(filePath, (err) => {
//     //   if (err) {
//     //     console.error("Error deleting the file:", err);
//     //   } else {
//     //     console.log("Local file deleted successfully.");
//     //   }
//     // });

//     fs.unlinkSync(filePath);
//     const companyLogo = cloudResponse.secure_url
//     const updateData = { name, description, website, location, companyLogo }
//     const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!company) {
//       return res.status(404).json({
//         message: "Company not found",
//         success: false
//       })
//     }
//     return res.status(200).json({
//       message: "Company information updated",
//       success: true
//     })
//   }
//   catch (error) {
//     console.log(error);
//   }
// }

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded", success: false });
    }

    // Upload to Cloudinary
    const filePath = req.file.path;
    const cloudResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "company_logo",
      transformation: [{ width: 300, height: 300, crop: "fill", gravity: "face" }],
    });

    if (!cloudResponse || !cloudResponse.secure_url) {
      return res.status(500).json({ message: "Cloudinary upload failed", success: false });
    }

    // Delete local file
    fs.unlinkSync(filePath);

    const logo = cloudResponse.secure_url;
    console.log(logo)
    const updateData = { name, description, website, location,logo};

    // Update company
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }

    return res.status(200).json({
      message: "Company information updated",
      success: true,
      company
    });

  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
