import React from 'react';

interface FutsalCardProps { // Interface for data
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
  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <img className="rounded-t-lg" src={image} alt={name} />
      </a>
      <div className="p-5">
        <a href="#">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {name}
          </h3>
        </a>
        <div className="flex items-center mb-2">
          
          <p className="text-gray-700 dark:text-gray-400 ">Address : {location}</p>
        </div>
        <p className="text-gray-700 dark:text-gray-400 mb-2">Price : Rs.{price.toFixed(2)}</p>
        <button
          onClick={onBook}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-semibold mx-auto" // Added `mx-auto` for centering
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default FutsalCard;
