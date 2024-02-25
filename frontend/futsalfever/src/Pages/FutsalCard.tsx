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
  return (
    <div
      className="flex flex-col items-center rounded-lg overflow-hidden bg-white border shadow-md max-w-sm"
    >
      <img
        src={image}
        alt={name}
        className="w-full object-cover h-48 rounded-t-lg"
      />
      <div className="flex-grow px-4 py-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <div className="flex items-center mb-2">
          <svg
            className="w-5 h-5 mr-2 fill-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.084A3.932 3.932 0 0 1 13.942 8.132v3.887h-3.887A3.932 3.932 0 0 1 9.049 2.084zM9.049 0A4.929 4.929 0 0 0 4.12 4.929h3.887A4.929 4.929 0 0 0 12.966 0h-3.887zM16.068 9.049A3.932 3.932 0 0 1 12.126 12.966v3.887h3.887A3.932 3.932 0 0 1 16.068 9.049zM16.068 13.942A4.929 4.929 0 0 0 11.139 19h3.887A4.929 4.929 0 0 0 20 13.942h-3.887z" />
          </svg>
          <p className="text-gray-700">{location}</p>
        </div>
        <p className="text-gray-700 mb-2">Price: Rs.{price.toFixed(2)}</p>
        <button
          onClick={onBook}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default FutsalCard;
