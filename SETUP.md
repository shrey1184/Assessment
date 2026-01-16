# Room Finder - Setup Guide

## Quick Start

### 1. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Setup

#### A. Create Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Save your project URL and anon key

#### B. Run Database Schema
1. Go to SQL Editor in Supabase Dashboard
2. Run the SQL from `schema.sql`

#### C. Create Storage Bucket
1. Go to Storage in Supabase Dashboard
2. Create a new bucket named `room-images`
3. Make it **public**
4. Set these policies:
   - INSERT: authenticated users only
   - SELECT: public
   - UPDATE: owner only
   - DELETE: owner only

#### D. Configure Authentication
1. Go to Authentication > Providers
2. Enable Email provider
3. Configure Email templates (optional)

### 3. Run Development Server

```bash
cd frontend
npm run dev
```

Open http://localhost:5173

## Project Structure

```
Assessment/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── RoomCard.jsx
│   │   │   ├── RoomForm.jsx
│   │   │   ├── Filters.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── AddRoom.jsx
│   │   │   └── MyRooms.jsx
│   │   ├── lib/
│   │   │   └── supabase.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env (create this)
│   └── package.json
├── schema.sql
├── SETUP.md
└── docs.md
```

## Features Implemented

✅ User authentication (Email OTP)
✅ Browse all rooms
✅ Search and filter rooms (location, price, type, preference)
✅ Add new rooms (authenticated users)
✅ Edit own rooms
✅ Delete own rooms
✅ Upload multiple images
✅ Protected routes
✅ Responsive design

## Deployment to Vercel

1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy

## Testing the Application

### Test Flow:
1. Visit homepage - see empty or sample rooms
2. Click Login
3. Enter email and receive OTP
4. Verify OTP
5. Click "Add Room" in navbar
6. Fill form and upload images
7. Submit room
8. View in "My Rooms"
9. Edit or delete as needed
10. Logout and verify room is still visible (but not editable)

## Troubleshooting

### Images not uploading?
- Check storage bucket is public
- Verify bucket name is exactly `room-images`
- Check RLS policies on storage

### Can't login?
- Check email provider is enabled in Supabase
- Check inbox/spam for OTP email

### Rooms not showing?
- Check database table was created
- Verify RLS policies are correct
- Check browser console for errors
