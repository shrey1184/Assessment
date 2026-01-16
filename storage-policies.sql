-- Storage Policies for room-images bucket
-- Run this in Supabase SQL Editor

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Public can read room images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;

-- Single policy: Allow all operations for authenticated users on room-images bucket
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'room-images')
WITH CHECK (bucket_id = 'room-images');
