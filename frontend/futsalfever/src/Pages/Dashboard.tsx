import React, { useEffect, useState } from 'react';
import FutsalCard from './FutsalCard';
import NavBar from './Navbar';

interface Futsal {
  id: number;
  name: string;
  image: string;
  location: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const [futsals, setFutsals] = useState<Futsal[]>([]);

  useEffect(() => {
    // Simulated data for demonstration
    const dummyFutsals: Futsal[] = [
      {
        id: 1,
        name: 'Futsal A',
        image: 'https://english.onlinekhabar.com/wp-content/uploads/2023/02/Futsal-scaled.jpg',
        location: 'Location A',
        price: 20,
      },
      {
        id: 2,
        name: 'Futsal B',
        image: 'https://english.onlinekhabar.com/wp-content/uploads/2023/02/Futsal-scaled.jpg',
        location: 'Location B',
        price: 25,
      },
      {
        id: 3,
        name: 'Futsal C',
        image: 'https://english.onlinekhabar.com/wp-content/uploads/2023/02/Futsal-scaled.jpg',
        location: 'Location C',
        price: 30,
      },
    ];

    // Set the dummy data
    setFutsals(dummyFutsals);
  }, []);

  const handleBook = (id: number) => {
    // Navigate to the booking page for the specific futsal ID
    window.location.href = `/booking/${id}`;
  };

  return (
    <div className="dashboard">
      {/* Navigation Bar */}
      <NavBar />

      {/* Futsal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Mapping through available futsals */}
        {futsals.map(futsal => (
          <FutsalCard
            key={futsal.id}  // Unique identifier for each card
            name={futsal.name}  // Name of the futsal
            image={futsal.image}  // Image representing the futsal
            location={futsal.location}  // Location of the futsal
            price={futsal.price}  // Price details
            onBook={() => handleBook(futsal.id)}  // Booking handler
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
