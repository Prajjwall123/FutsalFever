import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFutsals } from '../services/futsalHelper';
import FutsalCard from './FutsalCard';
import NavBar from './Navbar';
interface Futsal {
  id: number;
  name: string;
  image: string; // Replace with placeholders or data if available
  address: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [futsals, setFutsals] = useState<Futsal[]>([]);

  useEffect(() => {
    // Fetch futsals when the component mounts
    getAllFutsals()
      .then((futsalsData) => {
        setFutsals(futsalsData);
      })
      .catch((error) => {
        console.error('Error fetching futsals:', error);
      });
  }, []);

  const handleBook = (id: number) => {
    // Provide a fallback message or navigation logic based on your application structure
    console.log(`Navigate to booking page for id: ${id}`);
    navigate("/booking/"+id)
  };

  return (
    <div className="dashboard bg-gray-900 min-h-screen rounded-3xl">
      {/* Navigation Bar */}
      <NavBar />

      <div className="container mx-auto py-8 px-6">
        {/* Title and slogan */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">FutsalFever</h1>
          <p className="text-lg text-gray-500">Find your perfect futsal match</p>
        </div>

        {/* Futsal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {/* Mapping through available futsals */}
          {futsals.map((futsal) => (
            <FutsalCard
              key={futsal.id}
              name={futsal.name.toUpperCase()} // Display name in uppercase
              image={futsal.image} // Replace with placeholder or actual image
              location={futsal.address}
              price={futsal.price}
              onBook={() => handleBook(futsal.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
