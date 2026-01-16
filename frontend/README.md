# Room Finder Frontend

A React-based Room Finder application built with Vite, React Router, and Supabase.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Database Setup

Run this SQL in your Supabase SQL Editor to create the rooms table with proper RLS policies.

### 4. Create Storage Bucket

1. Go to Supabase Storage
2. Create a new **public** bucket named `room-images`
3. Set the bucket to public

### 5. Run Development Server

```bash
npm run dev
```

## Features

- **Browse Rooms**: View all available room listings
- **Search & Filter**: Filter by location, price range, property type, and tenant preference
- **Authentication**: Email OTP login via Supabase
- **Add Rooms**: Authenticated users can add new room listings with images
- **Manage Rooms**: Edit and delete your own room listings
- **Image Upload**: Upload multiple images to Supabase Storage

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── lib/             # Supabase config
│   ├── App.jsx          # Main app with routing
│   └── index.css        # Tailwind imports
```

## Tech Stack

- React 19 + Vite
- React Router DOM
- Tailwind CSS
- Supabase (Auth, Database, Storage)
