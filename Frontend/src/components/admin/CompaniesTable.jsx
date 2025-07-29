import React, { useEffect, useState } from 'react'
import { Table, TableCaption, TableHeader, TableHead, TableRow, TableBody, TableCell } from '../ui/table'
import { Avatar, AvatarImage } from "../ui/avatar"
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import image from './assets/download.png'

function CompaniesTable() {

  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {

            filterCompany?.map((company) => (
              <tr>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${company?._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))


          }

        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
