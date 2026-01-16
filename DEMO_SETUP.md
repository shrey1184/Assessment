# Demo Room Data Setup

## Steps to Add Sample Rooms

### 1. Sign Up in the App
1. Go to http://localhost:5173
2. Click "Login"
3. Enter your email
4. Verify with OTP
5. You're now logged in!

### 2. Add Sample Rooms to Database

#### Option A: Via Supabase SQL Editor (Recommended)
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Open `sample-rooms.sql` from this project
4. Copy and paste the entire SQL
5. Click **Run**

This will automatically use your user ID and create 10 sample rooms.

#### Option B: Add Manually via App
Just use the "Add Room" button in the app and fill in the form!

### Sample Rooms Included

The demo data includes:
- 10 different room listings
- Various property types (1 BHK, 2 BHK, 1 Bed, 2 Bed)
- Different tenant preferences (Family, Bachelor, Girls, Working)
- Price range: ₹8,500 to ₹45,000
- Multiple locations in Bangalore
- Sample images from Unsplash

### Features to Test After Adding Demo Data

1. **Browse Rooms** - See all 10 rooms on homepage
2. **Search by Location** - Try filtering by "Koramangala", "HSR", etc.
3. **Filter by Price** - Set min/max rent ranges
4. **Filter by Property Type** - Select 1 BHK, 2 BHK, etc.
5. **Filter by Tenant Preference** - Bachelor, Family, Girls, Working
6. **Edit Rooms** - Go to "My Rooms" and edit any room
7. **Delete Rooms** - Remove rooms you don't want

Enjoy testing! 🎉
