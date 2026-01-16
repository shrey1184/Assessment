import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function RoomForm({ room = null, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: room?.title || '',
    location: room?.location || '',
    rent: room?.rent || '',
    property_type: room?.property_type || '',
    tenant_preference: room?.tenant_preference || '',
    contact_number: room?.contact_number || ''
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types and size
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max
      
      if (!isImage) {
        setError(`${file.name} is not a valid image file`);
        return false;
      }
      if (!isValidSize) {
        setError(`${file.name} exceeds 5MB size limit`);
        return false;
      }
      return true;
    });
    
    setImages(validFiles);
    setError('');
  };

  const uploadImageToSupabase = async (file, userId) => {
    try {
      // Generate unique file path: rooms/{userId}/{timestamp}-{originalFilename}
      const timestamp = Date.now();
      const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
      const filePath = `rooms/${userId}/${timestamp}-${fileName}`;
      
      console.log('📤 Uploading:', file.name, 'to path:', filePath);
      
      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('room-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
        throw new Error(uploadError.message || 'Upload failed');
      }

      if (!data || !data.path) {
        throw new Error('Upload succeeded but no path returned');
      }

      console.log('✅ Upload successful, path:', data.path);

      // Get public URL - Supabase returns { data: { publicUrl } }
      const { data: { publicUrl } } = supabase.storage
        .from('room-images')
        .getPublicUrl(data.path);
      
      if (!publicUrl) {
        throw new Error('Failed to generate public URL');
      }

      console.log('🔗 Public URL:', publicUrl);
      return publicUrl;
    } catch (err) {
      console.error('💥 Error uploading image:', err);
      throw err;
    }
  };

  const uploadImages = async (userId) => {
    const imageUrls = [];
    const errors = [];
    
    console.log(`Starting upload of ${images.length} images for user ${userId}`);
    
    for (const file of images) {
      try {
        const publicUrl = await uploadImageToSupabase(file, userId);
        imageUrls.push(publicUrl);
        console.log(`Successfully uploaded ${file.name}`);
      } catch (err) {
        const errorMessage = err.message || 'Unknown error';
        console.error(`Failed to upload ${file.name}:`, errorMessage);
        errors.push(`${file.name}: ${errorMessage}`);
      }
    }
    
    if (errors.length > 0) {
      const errorMsg = `Upload failed:\n${errors.join('\n')}`;
      console.error(errorMsg);
      setError(errorMsg);
    }
    
    console.log(`Upload complete. Successful: ${imageUrls.length}, Failed: ${errors.length}`);
    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('You must be logged in to add a room');
        setLoading(false);
        return;
      }

      let imageUrls = room?.images || [];
      
      // For new rooms, require at least one image
      if (!room && images.length === 0) {
        setError('Please upload at least one image');
        setLoading(false);
        return;
      }
      
      // Upload new images if any
      if (images.length > 0) {
        console.log('Starting image upload process...');
        const uploadedUrls = await uploadImages(user.id);
        
        if (uploadedUrls.length === 0) {
          const errorMsg = 'Failed to upload images. Please check:\n' +
            '1. Storage bucket "room-images" exists in Supabase\n' +
            '2. Bucket is set to PUBLIC\n' +
            '3. Check browser console for detailed errors';
          setError(errorMsg);
          setLoading(false);
          return;
        }
        
        console.log(`Successfully uploaded ${uploadedUrls.length} image(s)`);
        
        // For edits, append to existing images; for new rooms, use uploaded images
        imageUrls = room ? [...imageUrls, ...uploadedUrls] : uploadedUrls;
      }

      const roomData = {
        ...formData,
        rent: parseInt(formData.rent),
        images: imageUrls,
        owner_id: user.id
      };

      if (room) {
        const { error: updateError } = await supabase
          .from('rooms')
          .update(roomData)
          .eq('id', room.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('rooms')
          .insert([roomData]);

        if (insertError) throw insertError;
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        {room ? 'Edit Room' : 'Add New Room'}
      </h2>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rent (₹/month) *
          </label>
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Property Type *
          </label>
          <select
            name="property_type"
            value={formData.property_type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Type</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="1 Bed">1 Bed</option>
            <option value="2 Bed">2 Bed</option>
            <option value="3 Bed">3 Bed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tenant Preference *
          </label>
          <select
            name="tenant_preference"
            value={formData.tenant_preference}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Preference</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Family">Family</option>
            <option value="Girls">Girls</option>
            <option value="Working">Working</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contact Number *
          </label>
          <input
            type="tel"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Room Images {!room && <span className="text-red-500">*</span>}
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-gray-600 file:text-blue-700 dark:file:text-gray-200 hover:file:bg-blue-100 dark:hover:file:bg-gray-500"
        />
        {images.length > 0 && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            ✓ {images.length} image{images.length > 1 ? 's' : ''} selected (max 5MB each)
          </p>
        )}
        {!room && images.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Please upload at least one image
          </p>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Uploading & Saving...' : room ? 'Update Room' : 'Add Room'}
        </button>
      </div>
    </form>
  );
}
