# Room Finder Application

A modern, full-stack Room Finder application built with React, Vite, and Supabase. Find, list, and manage room rentals with a clean, responsive interface and dark mode support.

## Features

### Core Functionality
- **Browse Rooms**: View all available room listings with detailed information
- **Real-time Search**: Search rooms by title and location instantly
- **Advanced Filters**: Filter by location, price range, property type, and tenant preference (collapsible UI)
- **Authentication**: Secure email OTP login via Supabase Auth
- **Add Rooms**: Authenticated users can create room listings with multiple images
- **Manage Rooms**: Edit and delete your own listings from My Rooms page
- **Image Upload**: Upload multiple images to Supabase Storage

### User Experience
- **Profile Dashboard**: View account details and room statistics
- **Quick Actions**: Access Add Room, My Rooms, and theme toggle from Profile
- **Dark Mode**: System-wide dark/light theme toggle with localStorage persistence
- **Mobile Responsive**: Hamburger menu navigation optimized for mobile and tablet
- **Minimal Navbar**: Streamlined navigation with Browse Rooms, Profile, and Login/Logout

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Database Setup

Your database is already configured if you've run the SQL scripts in Supabase. The project includes:
- `schema.sql` - Database schema with RLS policies
- `sample-rooms.sql` - Demo room data (optional)

### 4. Create Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Create a new **public** bucket named `room-images`
3. Set the bucket to public access

### 5. Run Development Server

```bash
npm run dev
```

Access the application at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation with auth state & hamburger menu
│   │   ├── RoomCard.jsx         # Room display card (dark mode)
│   │   ├── RoomForm.jsx         # Add/Edit room form (dark mode)
│   │   ├── Filters.jsx          # Collapsible search filters
│   │   └── ProtectedRoute.jsx   # Route authentication guard
│   ├── pages/
│   │   ├── Home.jsx             # Browse rooms with search
│   │   ├── Login.jsx            # Email OTP authentication
│   │   ├── AddRoom.jsx          # Create new room listing
│   │   ├── MyRooms.jsx          # Manage user's listings
│   │   └── Profile.jsx          # User profile with quick actions
│   ├── lib/
│   │   ├── supabase.js          # Supabase client configuration
│   │   └── ThemeContext.jsx     # Dark mode context & provider
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind CSS imports
├── tailwind.config.js           # Tailwind with dark mode
└── package.json
```

## Tech Stack

- **Frontend**: React 19 + Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v3.4.17 (dark mode enabled)
- **Backend**: Supabase (Auth, PostgreSQL, Storage)
- **State Management**: React Context API (Theme)
- **Authentication**: Supabase Email OTP
