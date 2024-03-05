import React from 'react';

interface FutsalCardProps {
  name: string;
  image: string;
  location: string;
  price: number;
  onBook: () => void;
}

const FutsalCard: React.FC<FutsalCardProps> = ({
  name,
  image,
  location,
  price,
  onBook,
}) => {
  const handleBook = () => {
    const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists

    if (isLoggedIn) {
      onBook();
    } else {
      alert('Please login to view futsal details.');
      // You can also use toastify or any other toast library here
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <a href="#">
        <img
          className="w-full h-48 object-cover"
          src={`data:image/jpeg;base64,${image}`}
          alt={name}
        />
      </a>
      <div className="p-6">
        <a href="#">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {name}
          </h3>
        </a>
        <div className="flex items-center mb-2">
          <p className="text-gray-600">Address: {location}</p>
        </div>
        <p className="text-gray-600 mb-2">Price: Rs.{price.toFixed(2)}</p>
        <button
          onClick={handleBook}
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-blue-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FutsalCard;
