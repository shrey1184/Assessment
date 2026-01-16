# Room Finder - Component Overview

## Components Created

### 1. **Navbar.jsx** (`/src/components/`)
- Displays navigation bar with logo and links
- Shows user authentication state
- Conditional rendering: Login button vs Logout + owner links
- Uses Supabase `onAuthStateChange` for real-time auth state

### 2. **RoomCard.jsx** (`/src/components/`)
- Displays individual room information
- Shows: image, title, location, rent, property type, tenant preference, contact
- Responsive card layout with hover effects
- Used in Home and MyRooms pages

### 3. **Filters.jsx** (`/src/components/`)
- Search and filter interface
- Fields: location (text), price range (min/max), property type, tenant preference
- Calls `onFilterChange` callback with filter state
- Reset filters button

### 4. **RoomForm.jsx** (`/src/components/`)
- Reusable form for adding/editing rooms
- Handles file uploads to Supabase Storage
- Form validation
- Success callback on submit
- Used in AddRoom and MyRooms (edit mode)

### 5. **ProtectedRoute.jsx** (`/src/components/`)
- HOC for route protection
- Checks user authentication via Supabase
- Redirects to /login if not authenticated
- Shows loading state while checking auth

## Pages Created

### 1. **Home.jsx** (`/src/pages/`)
- Main landing page
- Fetches and displays all rooms
- Integrates Filters component
- Client-side filtering logic
- Grid layout for room cards

### 2. **Login.jsx** (`/src/pages/`)
- Two-step OTP authentication
- Step 1: Email input → Send OTP
- Step 2: OTP input → Verify and login
- Redirects to home after successful login
- Error handling and user feedback

### 3. **AddRoom.jsx** (`/src/pages/`)
- Protected route (requires auth)
- Renders RoomForm component
- Redirects to /my-rooms after successful submission

### 4. **MyRooms.jsx** (`/src/pages/`)
- Protected route (requires auth)
- Lists rooms owned by current user
- Edit and Delete buttons for each room
- Inline editing (shows RoomForm when editing)
- Confirms before deletion

## Utilities

### **supabase.js** (`/src/lib/`)
- Creates and exports Supabase client
- Reads environment variables
- Single source of truth for Supabase instance

## App Structure

### **App.jsx**
- BrowserRouter setup
- Route configuration:
  - `/` → Home (public)
  - `/login` → Login (public)
  - `/add-room` → AddRoom (protected)
  - `/my-rooms` → MyRooms (protected)
- Navbar on all pages
- Clean layout wrapper

### **main.jsx**
- App entry point
- Renders React app
- Imports global styles

### **index.css**
- Tailwind CSS imports
- Global styles

## Data Flow

```
User → Login → Supabase Auth → Session
                    ↓
User (authenticated) → Add Room → RoomForm → Supabase Storage (images)
                                            → Supabase DB (room data)
                    ↓
All Users → Home → Filters → Filtered Rooms Display
                    ↓
Owner → My Rooms → Edit/Delete → Supabase DB
```

## Key Features

1. **Authentication**: Email OTP via Supabase
2. **Authorization**: Row Level Security policies
3. **File Upload**: Multiple images to Supabase Storage
4. **Real-time State**: Auth state changes reflect immediately
5. **Client-side Filtering**: Fast, responsive search
6. **Protected Routes**: Automatic redirect for unauthenticated users
7. **Responsive Design**: Tailwind CSS grid layouts
8. **Clean Architecture**: Component-based, reusable code

## Environment Variables Required

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## No External Dependencies Beyond

- React 19
- React Router DOM
- Supabase JS Client
- Tailwind CSS
- Vite (build tool)

All logic is self-contained, no placeholder code, ready for production use.
