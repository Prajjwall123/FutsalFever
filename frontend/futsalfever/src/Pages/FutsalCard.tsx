import React from 'react';

interface FutsalCardProps {
  name: string;
  image: string;
  location: string;
  price: number;
  onBook: () => void;
}

const FutsalCard: React.FC<FutsalCardProps> = ({ name, image, location, price, onBook }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <img src={image} alt={name} className="w-full rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-700 mb-2">Location: {location}</p>
        <p className="text-gray-700 mb-2">Price: ${price}</p>
        <button onClick={onBook} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Book
        </button>
      </div>
    </div>
  );
}

export default FutsalCard;
