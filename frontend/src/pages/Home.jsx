import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import RoomCard from '../components/RoomCard';
import Filters from '../components/Filters';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRooms(data || []);
      setFilteredRooms(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = [...rooms];

    if (filters.location) {
      filtered = filtered.filter(room => 
        room.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minRent) {
      filtered = filtered.filter(room => room.rent >= parseInt(filters.minRent));
    }

    if (filters.maxRent) {
      filtered = filtered.filter(room => room.rent <= parseInt(filters.maxRent));
    }

    if (filters.propertyType) {
      filtered = filtered.filter(room => room.property_type === filters.propertyType);
    }

    if (filters.tenantPreference) {
      filtered = filtered.filter(room => room.tenant_preference === filters.tenantPreference);
    }

    setFilteredRooms(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading rooms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Your Room</h1>
      
      <Filters onFilterChange={handleFilterChange} />

      {filteredRooms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No rooms found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
