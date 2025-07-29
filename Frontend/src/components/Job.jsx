import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import image from '../assets/download.png'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Job({ job }) {
  const navigate = useNavigate()
const daysAgoFunction=(mongoDbTime)=>{
  const createdAt=new Date(mongoDbTime);
  const currentDate=new Date();
  const timeDifference=currentDate-createdAt;
  return Math.floor(timeDifference / (1000*24*60*60))
}
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>

      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500 '>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button varient='outline' className="rounded-full" size="icon"><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost"> {job?.position}</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209b7] text-gray-200">Save for later</Button>
      </div>

    </div>
  )
}

export default Job
