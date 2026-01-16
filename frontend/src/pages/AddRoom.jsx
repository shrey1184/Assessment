import { useNavigate } from 'react-router-dom';
import RoomForm from '../components/RoomForm';

export default function AddRoom() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/my-rooms');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-900 min-h-screen">
      <RoomForm onSuccess={handleSuccess} />
    </div>
  );
}
