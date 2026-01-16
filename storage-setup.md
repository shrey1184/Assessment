# Supabase Storage Setup Instructions

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **Storage** in the left sidebar
4. Click **New bucket**
5. Enter bucket name: `room-images`
6. Set **Public bucket**: ✅ **YES** (very important!)
7. Click **Create bucket**

## Step 2: Configure Storage Policies (if needed)

If you still have upload issues, go to Storage → Policies and add:

### Policy 1: Allow authenticated users to upload

```sql
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'room-images' AND
  (storage.foldername(name))[1] = 'rooms'
);
```

### Policy 2: Anyone can view images (public bucket)

```sql
CREATE POLICY "Public access to room images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'room-images');
```

### Policy 3: Users can update their own images

```sql
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'room-images' AND
  (storage.foldername(name))[2] = auth.uid()::text
);
```

### Policy 4: Users can delete their own images

```sql
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'room-images' AND
  (storage.foldername(name))[2] = auth.uid()::text
);
```

## Step 3: Verify Setup

Run this in your browser console on the app page:

```javascript
// Test if you can list buckets
const { data, error } = await supabase.storage.listBuckets();
console.log('Buckets:', data, 'Error:', error);

// Test upload
const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
const { data: uploadData, error: uploadError } = await supabase.storage
  .from('room-images')
  .upload('test/test.txt', testFile);
console.log('Upload test:', uploadData, 'Error:', uploadError);
```

## Common Issues

### "Bucket not found"
- The bucket `room-images` doesn't exist
- Create it in Supabase Dashboard → Storage

### "new row violates row-level security policy"
- The bucket is not public OR
- Storage policies are blocking uploads
- Make sure bucket is set to PUBLIC

### "No such file or directory"
- File path is invalid
- Check that you're using correct path format: `rooms/{userId}/{filename}`
