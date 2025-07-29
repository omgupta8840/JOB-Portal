// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Loader2 } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { setUser } from '@/redux/authSlice'
// import { toast } from 'sonner'

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector(store => store.auth);

//   const [input, setInput] = useState({
//     fullname: user?.fullname || "",
//     email: user?.email || "",
//     phoneNumber: user?.phoneNumber || "",
//     bio: user?.profile?.bio || "",
//    skills:user?.profile?.skills || "",
//     file: user?.profile?.resume || null
//   });

//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   }

//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     // formData.append("phoneNumber", input.phoneNumber);
//     formData.append("phoneNumber", String(input.phoneNumber).trim());

//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills.split(",").map(skill => skill.trim())); // Convert back to array

//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         withCredentials: true
//       });

//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         toast.success(res.data.message);
//         setOpen(false);  // Close modal only if request succeeds
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//       console.log(input)
//     }
//   }

//   return (
//     <div>
//       <Dialog open={open} onOpenChange={setOpen}>  {/* Added onOpenChange */}
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Update Profile</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={submitHandler}>
//             <div className='grid gap-4 py-4'>
//               <div className='grid grid-cols-4 items-center gap-4'>
//                 <Label htmlFor="fullname" className="text-right">Name</Label>
//                 <Input
//                   id="fullname"
//                   name="fullname"
//                   type="text"
//                   value={input.fullname}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className='grid grid-cols-4 items-center gap-4'>
//                 <Label htmlFor="email" className="text-right">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={input.email}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className='grid grid-cols-4 items-center gap-4'>
//                 <Label htmlFor="phoneNumber" className="text-right">Number</Label>
//                 <Input
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   type="text"
//                   value={input.phoneNumber}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className='grid grid-cols-4 items-center gap-4'>
//                 <Label htmlFor="bio" className="text-right">Bio</Label>
//                 <Input
//                   id="bio"
//                   name="bio"
//                   value={input.bio}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className='grid grid-cols-4 items-center gap-4'>
//                 <Label htmlFor="skills" className="text-right">Skills</Label>
//                 <Input
//                   id="skills"
//                   name="skills"
//                   value={input.skills}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className='grid grid-cols-4 items-center gap-4'>
//                 <Label htmlFor="file" className="text-right">Resume</Label>
//                 <Input
//                   id="file"
//                   name="file"
//                   type="file"
//                   accept="application/pdf"
//                   onChange={fileChangeHandler}
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               {loading ? (
//                 <Button className="w-full my-4">
//                   <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-full my-4">Update</Button>
//               )}
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default UpdateProfileDialog;




// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
// import { Label } from './ui/label';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { Loader2 } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { USER_API_END_POINT } from '@/utils/constant';
// import { setUser } from '@/redux/authSlice';
// import { toast } from 'sonner';

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector(store => store.auth);
//   const dispatch = useDispatch();

//   const [input, setInput] = useState({
//     fullname: user?.fullname || "",
//     email: user?.email || "",
//     phoneNumber: user?.phoneNumber ? String(user.phoneNumber) : "", // ✅ Ensure it's a string
//     bio: user?.profile?.bio || "",
//     skills: Array.isArray(user?.profile?.skills) ? user.profile.skills.join(", ") : "", // ✅ Convert array to string
//     file: user?.profile?.resume || null
//   });

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", String(input.phoneNumber).trim()); // ✅ Ensure safe handling
//     formData.append("bio", input.bio);
//     formData.append("skills", JSON.stringify(input.skills.split(",").map(skill => skill.trim()))); // ✅ Ensure correct format

//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         withCredentials: true
//       });

//       console.log("Updated user data:", res.data.user); // ✅ Debugging

//       if (res.data.success) {
//         dispatch(setUser(res.data.user)); // ✅ Ensure Redux updates
//         toast.success(res.data.message);
//         setOpen(false); // ✅ Close modal only if request succeeds
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={submitHandler}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="fullname" className="text-right">Name</Label>
//               <Input
//                 id="fullname"
//                 name="fullname"
//                 type="text"
//                 value={input.fullname}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-right">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={input.email}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="phoneNumber" className="text-right">Number</Label>
//               <Input
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 type="text"
//                 value={input.phoneNumber}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="bio" className="text-right">Bio</Label>
//               <Input
//                 id="bio"
//                 name="bio"
//                 value={input.bio}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="skills" className="text-right">Skills</Label>
//               <Input
//                 id="skills"
//                 name="skills"
//                 value={input.skills}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file" className="text-right">Resume</Label>
//               <Input
//                 id="file"
//                 name="file"
//                 type="file"
//                 accept="application/pdf"
//                 onChange={fileChangeHandler}
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             {loading ? (
//               <Button className="w-full my-4">
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//               </Button>
//             ) : (
//               <Button type="submit" className="w-full my-4">Update</Button>
//             )}
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UpdateProfileDialog;




import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map(skill => skill) || "",
    file: user?.profile?.resume || ""
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  }



  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle className="text-white">Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="fullname" className="text-right text-white">Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="email" className="text-right text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="phoneNumber" className="text-right text-white">Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="bio" className="text-right text-white">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="skills" className="text-right text-white">Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="file" className="text-right text-white">Resume</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3 bg-white"
                />
              </div>
            </div>
            <DialogFooter>
              {
                loading ? <Button className="w-full my-4 text-white"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 text-white border border-solid-white">Update</Button>
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog