-- Sample Room Data for Demo
-- Run this AFTER you've created at least one user account via the app

-- First, get your user ID by signing up and running this query:
-- SELECT id FROM auth.users LIMIT 1;
-- Then replace 'YOUR_USER_ID_HERE' below with your actual UUID

-- Option 1: Insert with your user ID (replace the UUID below)
-- You can find your user ID by going to Authentication > Users in Supabase dashboard

INSERT INTO rooms (title, location, rent, property_type, tenant_preference, contact_number, images, owner_id) VALUES
('Spacious 2BHK in Koramangala', 'Koramangala, Bangalore', 25000, '2 BHK', 'Family', '+91 9876543210', 
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
  (SELECT id FROM auth.users LIMIT 1)),

('Modern 1BHK Near Metro', 'Indiranagar, Bangalore', 18000, '1 BHK', 'Bachelor', '+91 9876543211',
  ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800'],
  (SELECT id FROM auth.users LIMIT 1)),

('Cozy Single Room for Girls', 'HSR Layout, Bangalore', 12000, '1 Bed', 'Girls', '+91 9876543212',
  ARRAY['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'],
  (SELECT id FROM auth.users LIMIT 1)),

('Luxury 3 Bedroom Apartment', 'Whitefield, Bangalore', 45000, '2 BHK', 'Family', '+91 9876543213',
  ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800', 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800'],
  (SELECT id FROM auth.users LIMIT 1)),

('Affordable PG for Working Professionals', 'BTM Layout, Bangalore', 8500, '1 Bed', 'Working', '+91 9876543214',
  ARRAY['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'],
  (SELECT id FROM auth.users LIMIT 1)),

('Premium Studio Apartment', 'MG Road, Bangalore', 22000, '1 BHK', 'Bachelor', '+91 9876543215',
  ARRAY['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800', 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800'],
  (SELECT id FROM auth.users LIMIT 1)),

('Spacious 2 Bed Room', 'Jayanagar, Bangalore', 15000, '2 Bed', 'Girls', '+91 9876543216',
  ARRAY['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'],
  (SELECT id FROM auth.users LIMIT 1)),

('Family-Friendly 2BHK', 'Marathahalli, Bangalore', 28000, '2 BHK', 'Family', '+91 9876543217',
  ARRAY['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800'],
  (SELECT id FROM auth.users LIMIT 1)),

('Budget Single Room', 'Electronic City, Bangalore', 10000, '1 Bed', 'Bachelor', '+91 9876543218',
  ARRAY['https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800'],
  (SELECT id FROM auth.users LIMIT 1)),

('Fully Furnished 1BHK', 'Bellandur, Bangalore', 20000, '1 BHK', 'Working', '+91 9876543219',
  ARRAY['https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'],
  (SELECT id FROM auth.users LIMIT 1));
