import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

function CreateCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState('');

  const changeHandler = (e) => {
    setCompanyName(e.target.value)
  }
  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty!");
      return;
    }

    console.log("Company Name:", companyName); // Debugging Log

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName }, // Ensure correct field name
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log("Response:", res.data); // Debugging Log

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      } else {
        toast.error(res?.data?.message || "Failed to create company.");
      }
    } catch (error) {
      console.error("Error registering company:", error.response?.data);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };


  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Your Company Name</h1>
          <p className='text-gray-500'>
            What would you like to name your company? You can change this later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
           className="my-2"
          value={companyName}
          onChange={changeHandler}
          placeholder="Microsoft,Adobe.."
        />
        <div className='flex items-center gap-2 my-10'>
          <Button variant="outline" onClick={() => navigate("/admin/companies")}>
            Cancel
          </Button>
          <Button onClick={registerNewCompany} className="bg-black text-white">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
