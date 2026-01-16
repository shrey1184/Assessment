export default function RoomCard({ room }) {
  // Safely get the first image URL
  const imageUrl = room.images?.[0] || null;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={room.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{room.title}</h3>
        
        <div className="space-y-2 text-gray-600 dark:text-gray-300">
          <p className="flex items-center">
            <span className="font-medium mr-2">📍</span>
            {room.location}
          </p>
          
          <p className="flex items-center">
            <span className="font-medium mr-2">💰</span>
            ₹{room.rent}/month
          </p>
          
          <p className="flex items-center">
            <span className="font-medium mr-2">🏠</span>
            {room.property_type}
          </p>
          
          <p className="flex items-center">
            <span className="font-medium mr-2">👥</span>
            {room.tenant_preference}
          </p>
          
          <p className="flex items-center">
            <span className="font-medium mr-2">📞</span>
            {room.contact_number}
          </p>
        </div>
      </div>
    </div>
  );
}
