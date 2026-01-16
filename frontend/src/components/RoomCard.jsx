export default function RoomCard({ room }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        {room.images && room.images.length > 0 ? (
          <img 
            src={room.images[0]} 
            alt={room.title}
            className="w-full h-full object-cover"
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
