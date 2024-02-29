import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FutsalCard from '../components/FutsalCard';
import HeroSection from '../components/HeroSection';
import NavBar from '../components/Navbar';
import { getAllFutsals } from '../services/helper';

interface Futsal {
  id: number;
  name: string;
  image: string;
  address: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [futsals, setFutsals] = useState<Futsal[]>([]);

  useEffect(() => {
    getAllFutsals()
      .then((futsalsData) => {
        setFutsals(futsalsData);
      })
      .catch((error) => {
        console.error('Error fetching futsals:', error);
      });
  }, []);

  const handleBook = (id: number) => {
    console.log(`Navigate to booking page for id: ${id}`);
    navigate("/booking/"+id)
  };

  return (
    <div className="dashboard min-h-screen rounded-3xl">
      <NavBar />
      <HeroSection />
      <div className="container mx-auto py-8 px-6">
        <div className="text-center">
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {futsals.map((futsal) => (
            <FutsalCard
              key={futsal.id}
              name={futsal.name.toUpperCase()}
              image={futsal.image}
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
