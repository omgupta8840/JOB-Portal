// import React, { useEffect, useState } from 'react'
// import { Table, TableCaption, TableHeader, TableHead, TableRow, TableBody, TableCell } from '../ui/table'
// import { Avatar, AvatarImage } from "../ui/avatar"
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import useGetAllCompanies from '@/hooks/useGetAllCompanies'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// // import image from './assets/download.png'

// function AdminJobsTable() {


//   const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
//   const [filterJobs, setFilterJobs] = useState(allAdminJobs);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
//       if (!searchJobByText) {
//         return true
//       };
//       return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());

//     });
//     setFilterJobs(filteredJobs);
//   }, [allAdminJobs, searchJobByText])

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your posted jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {

//             filterJobs?.map((job) => (
//               <tr>
//                 <TableCell>{job?.company?.name}</TableCell>
//                 <TableCell>{job?.title}</TableCell>
//                 <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
//                 <TableCell className="text-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       <div onClick={() => navigate(`/admin/companies/${company?._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
//                         <Edit2 />
//                         <span>Edit</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </tr>
//             ))


//           }

//         </TableBody>
//       </Table>
//     </div>
//   )
// }

// export default AdminJobsTable



import React, { useEffect, useState } from 'react';
import { Table, TableCaption, TableHeader, TableHead, TableRow, TableBody, TableCell } from '../ui/table';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from "../ui/avatar"

function AdminJobsTable() {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

    useEffect(()=>{ 
     
      const filteredJobs =  allAdminJobs.length >=0 && allAdminJobs.filter((job)=>{
          if(!searchJobByText){
              return true;
          };
          return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

      });
      setFilterJobs(filteredJobs);
  },[allAdminJobs,searchJobByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr key={job?._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={job?.company?.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{job?.company?.name || "N/A"}</TableCell>
              <TableCell>{job?.title || "N/A"}</TableCell>
              <TableCell>{job?.createdAt ? job.createdAt.split("T")[0] : "N/A"}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={() => navigate(`/admin/companies/${job?.company?._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                      <Edit2 />
                      <span>Edit</span>
                    </div>

                    <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                      <Eye className='w-4'/>
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
