# Job Portal

A full-stack Job Portal application that allows students to search and apply for jobs, and recruiters to post and manage job listings and companies.

## Features

### For Students
- Register and login (with profile photo upload)
- Browse and search jobs by title, description, or location
- Apply for jobs (with resume upload)
- View applied jobs and their statuses
- Update profile, skills, and resume

### For Recruiters
- Register and login
- Create and manage companies (with logo upload)
- Post, edit, and manage job listings
- View applicants for each job and update their application status

### General
- Responsive UI built with React and Tailwind CSS
- RESTful API with Express.js and MongoDB
- File uploads handled via Multer and Cloudinary
- Authentication with JWT and cookies
- Role-based access for students and recruiters

## Project Structure

Backend/ controllers/ middleware/ models/ ResumeUploads/ route/ utils/ .env index.js package.json Frontend/ public/ src/ components/ hooks/ redux/ utils/ index.html package.json tailwind.config.js



### Prerequisites

- Node.js (v16+)
- MongoDB
- Cloudinary account (for file uploads)

### Backend Setup

1. Go to the `Backend` folder:
   ```sh
   cd Backend