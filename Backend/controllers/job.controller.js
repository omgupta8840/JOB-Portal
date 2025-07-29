import { Job } from "../models/job.model.js";

// admin job post krega
export const postJob = async (req, res) => {
  try {
      const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
      const userId = req.id;

      if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
          return res.status(400).json({
              message: "Somethin is missing.",
              success: false
          })
      };
      const job = await Job.create({
          title,
          description,
          requirements: requirements.split(","),
          salary: Number(salary),
          location,
          jobType,
          experienceLevel: experience,
          position,
          company: companyId,
          created_by: userId
      });
      return res.status(201).json({
          message: "New job created successfully.",
          job,
          success: true
      });
  } catch (error) {
      console.log(error);
  }
}

// student ke liye
export const getAllJobs =async (req,res)=>{
  try{
    const keyword=req.query.keyword || "";
    const query={
      $or:[
        {title:{$regex:keyword,$options:"i"}},
        {description:{$regex:keyword,$options:"i"}}
      ] 
    }




//     Job.find(query): Retrieves job listings matching the search criteria.
// .populate({ path: "company" }): Fetches additional details about the company associated with each job.
// .populate({ path: "created_by" }): Fetches user details of the job creator.
// .sort({ createdAt: -1 }): Sorts the jobs in descending order based on the createdAt timestamp.




    const jobs=await Job.find(query).populate({
      path:"company"
    }).populate({path:"created_by"}).sort({createdAt:-1});
    if(!jobs){
      return res.status(404).json({
        message:"Jobs not found",
        success:false
      })
    }
    return res.status(200).json({
      jobs,
      success:true
    })
  }
  catch(error){
    console.log(error);
  }
}

export const getJobById=async(req,res)=>{
  try{
    const jobId=req.params.id;
    const job = await Job.findById(jobId).populate({
      path:"applications"
  });
    if(!job){
      return res.status(404).json({
        message:"Job not found",
        success:false
      })
    }
    return res.status(201).json({
      job,
      success:true
    })
  }
  catch(error){
    console.log(error);
  }
}

//admin kitne job create kra hai abhi tk

export const getAdminJobs = async (req, res) => {
  try {
      const adminId = req.id;
      const jobs = await Job.find({ created_by: adminId }).populate({
          path:'company',
          createdAt:-1
      });
      if (!jobs) {
          return res.status(404).json({
              message: "Jobs not found.",
              success: false
          })
      };
      return res.status(200).json({
          jobs,
          success: true
      })
  } catch (error) {
      console.log(error);
  }
}