// import React, { useEffect, useState } from 'react';
// import FutsalCard from './FutsalCard';
// import NavBar from './Navbar';

// interface Futsal {
//   id: number;
//   name: string;
//   image: string;
//   location: string;
//   price: number;
// }

// const Dashboard: React.FC = () => {
//   const [futsals, setFutsals] = useState<Futsal[]>([]);

//   useEffect(() => {
//     // Simulated data for demonstration
//     const dummyFutsals: Futsal[] = [
//       {
//         id: 1,
//         name: 'Futsal A',
//         image: 'https://english.onlinekhabar.com/wp-content/uploads/2023/02/Futsal-scaled.jpg',
//         location: 'Location A',
//         price: 20,
//       },
//       // ... other futsals
//     ];

//     // Set the dummy data
//     setFutsals(dummyFutsals);
//   }, []);

//   const handleBook = (id: number) => {
//     // Navigate to the booking page for the specific futsal ID
//     window.location.href = `/booking/${id}`;
//   };

//   return (
//     <div className="dashboard">
//       {/* Navigation Bar */}
//       <NavBar />

//       <div className="flex justify-between items-center py-4 px-4 mt-4">
//         {/* Title and slogan */}
//         <h1 className="text-3xl font-bold text-gray-800">FutsalFever</h1>
//         <p className="text-lg text-gray-500">Explore trending futsals</p>
//       </div>

//       {/* Futsal Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {/* Mapping through available futsals */}
//         {futsals.map((futsal) => (
//           <FutsalCard
//             key={futsal.id}
//             name={futsal.name}
//             image={futsal.image}
//             location={futsal.location}
//             price={futsal.price}
//             onBook={() => handleBook(futsal.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useEffect, useState } from 'react';
import { getAllFutsals } from '../services/futsalHelper'; // Assuming you have a helper function to fetch futsals
import FutsalCard from './FutsalCard';
import NavBar from './Navbar';

interface Futsal {
  id: number;
  name: string;
  image: string;
  address: string;
  price: number;
}

const Dashboard: React.FC = () => {
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
    // Navigate to the booking page for the specific futsal ID
    window.location.href = `/booking/${id}`;
  };

  return (
    <div className="dashboard">
      {/* Navigation Bar */}
      <NavBar />

      <div className="flex justify-between items-center py-4 px-4 mt-4">
        {/* Title and slogan */}
        <h1 className="text-3xl font-bold text-gray-800">FutsalFever</h1>
        <p className="text-lg text-gray-500">Explore trending futsals</p>
      </div>

      {/* Futsal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Mapping through available futsals */}
        {futsals.map((futsal) => (
          <FutsalCard
            key={futsal.id}
            name={futsal.name}
            image={futsal.image}
            location={futsal.address}
            price={futsal.price}
            onBook={() => handleBook(futsal.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
