## 📌 MASTER COPILOT PROMPT: Room Finder Website

> **Context:**
> You are an expert full-stack engineer. Build a production-ready but minimal Room Finder web application for a hiring assignment. Focus on correctness, clarity, and completion over extra features.

---

### 🧠 Project Overview

Build a **Room Finder Website** where:

* Users can search and view rental rooms
* Room owners can add, edit, and delete room listings
* Supabase is used for authentication, database, and image storage
* The app is deployed on Vercel

This is a **5-day assignment**, so avoid overengineering.

---

## 🛠 Tech Stack (STRICT)

* **Framework:** React.js (App Router)
* **Language:** JavaScript
* **Styling:** Tailwind CSS
* **Backend:** Supabase only
* **Auth:** Supabase Email OTP
* **Storage:** Supabase Storage
* **Deployment:** Vercel

---

## 🧱 Functional Requirements

### 1. Authentication

* Email + OTP login using Supabase
* Maintain session using Supabase client
* Redirect unauthenticated users from owner routes

---

### 2. User Roles (Implicit)

* **Room Finder:** Can view and search rooms
* **Room Owner:** Can add/manage rooms
* No separate role table is required
* If a user creates a room, they are considered an owner

---

### 3. Database Schema (Supabase)

Create a `rooms` table:

```sql
rooms (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  location text not null,
  rent integer not null,
  property_type text not null,
  tenant_preference text not null,
  contact_number text not null,
  images text[],
  owner_id uuid references auth.users(id),
  created_at timestamp with time zone default now()
)
```

Create a **public storage bucket** named `room-images`.

---

## 🧑‍💻 Frontend Pages & Features

### 1. Public Pages

#### `/`

Home page displaying all room listings

Each room card must show:

* First room image
* Title
* Location
* Rent price
* Property type
* Tenant preference
* Contact number

---

### 2. Search & Filters (User Side)

Provide filters:

* Location (highest priority, text input)
* Price range (min–max)
* Property type (dropdown: 1 BHK, 2 BHK, 1/2/3 Bed)
* Tenant preference (Bachelor, Family, Girls, Working)

Filtering can be client-side or query-based.

---

### 3. Owner Pages

#### `/add-room`

* Protected route (auth required)
* Form to add a new room
* Upload multiple images
* Upload images to Supabase Storage
* Save public URLs in database

Fields:

* Title
* Location
* Rent
* Property type
* Tenant preference
* Contact number
* Images

---

#### `/my-rooms`

* Protected route
* Show all rooms where `owner_id == current user`
* Provide Edit and Delete buttons

---

#### Edit Room

* Pre-filled form
* Update database record
* Allow replacing images

---

#### Delete Room

* Delete room record from database
* Image deletion is optional

---

## 🧩 Supabase Integration Rules

* Create a reusable `supabaseClient`
* Handle loading and error states
* Use Supabase `onAuthStateChange` where required
* Use environment variables for keys

---

## 🎨 UI / UX Guidelines

* Responsive for mobile and desktop
* Clean, professional layout
* Simple Tailwind styling
* No animations required
* No dark mode required

---

## 🚫 Explicit Non-Goals (DO NOT IMPLEMENT)

* Chat system
* Admin panel
* Payment integration
* Maps
* AI features
* SSR optimization
* Testing frameworks

---

## 📁 Suggested Folder Structure

```
app/
 ├── page.tsx              // Room listing
 ├── login/
 ├── add-room/
 ├── my-rooms/
components/
 ├── RoomCard.tsx
 ├── RoomForm.tsx
 ├── Filters.tsx
lib/
 ├── supabase.ts
```

---

## 🚀 Deployment

* Deploy to Vercel
* Ensure environment variables are configured
* The deployed app must be fully functional

---

## 🧪 Quality Bar

* App runs without crashing
* CRUD operations work
* Images load correctly
* Filters function correctly
* Auth protects owner routes

Favor **completeness over perfection**.

---

### ✅ Deliver output as:

* Working react code
* Clean, readable components
* No placeholder logic
* No TODOs left behind

---

## 🧠 Final Instruction

Build this **as if you were completing a real hiring assignment**, not a tutorial.
Avoid overengineering. Prioritize correctness and clarity.

