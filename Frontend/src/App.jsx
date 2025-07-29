
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import CreateJobs from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'



function App() {


  const GoogleWrapper = ()=>(
		<GoogleOAuthProvider clientId="778104983145-neohntf5dsug48jt66jmcub7fk32l3tm.apps.googleusercontent.com">
			<Login></Login>
		</GoogleOAuthProvider>
	)
  
const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/login',
    element:<GoogleWrapper />
  },
  {
    path:'/signup',
    element:<Signup />
  },
  {
    path:'/jobs',
    element:<Jobs />
  },
  {
    path:'/description/:id',
    element:<JobDescription />
  },
  {
    path:'/browse',
    element:<Browse />
  },
  {
    path:'/profile',
    element:<Profile />
  },

  //admin ke liye yha se start hua hai
  {
    path:'/admin/companies',
    element:<ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><CreateCompany /></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectedRoute><CreateJobs /></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants /></ProtectedRoute>
  },
  

])

  return (
    <>
 <RouterProvider  router={appRouter} />
    </>
  )
}

export default App
