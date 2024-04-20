import React from 'react';
import { Link } from 'react-router-dom'; // If you want to make the card itself a link

function PropertyCard({ data }) {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-4"> {/* Basic styling */}
      <Link to={`/property-details?id=${data._id}`}> {/* Optional link */}
        <img src={data.image[0]} alt={data.title} className="w-full h-48 object-cover rounded-t-lg" />
        <div className="p-2">
          <h2 className="text-2xl font-semibold">{data.title}</h2>
          <p className="text-gray-400">{data.location}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="font-bold text-lg">${data.price}</p>
            {/* Add more data displays as needed: bedrooms, bathrooms, type, etc. */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PropertyCard;
