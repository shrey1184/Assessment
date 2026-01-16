import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import RoomCard from '../components/RoomCard';
import RoomForm from '../components/RoomForm';

export default function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    fetchMyRooms();
  }, []);

  const fetchMyRooms = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Please login to view your rooms');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRooms(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', roomId);

      if (error) throw error;

      setRooms(rooms.filter(room => room.id !== roomId));
    } catch (err) {
      alert('Error deleting room: ' + err.message);
    }
  };

  const handleEditSuccess = () => {
    setEditingRoom(null);
    fetchMyRooms();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading your rooms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <div className="text-xl text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  if (editingRoom) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-900 min-h-screen">
        <button
          onClick={() => setEditingRoom(null)}
          className="mb-4 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to My Rooms
        </button>
        <RoomForm room={editingRoom} onSuccess={handleEditSuccess} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">My Rooms</h1>

      {rooms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">You haven't added any rooms yet</p>
          <a
            href="/add-room"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          >
            Add Your First Room
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="relative">
              <RoomCard room={room} />
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setEditingRoom(room)}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
