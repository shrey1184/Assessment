import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Room Finder
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Browse Rooms
            </Link>
            
            {user ? (
              <>
                <Link to="/add-room" className="text-gray-700 hover:text-gray-900">
                  Add Room
                </Link>
                <Link to="/my-rooms" className="text-gray-700 hover:text-gray-900">
                  My Rooms
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
