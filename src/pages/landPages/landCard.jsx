import React, { useState } from 'react';

function LandCard({ data }) {
  const [selectedLand, setSelectedLand] = useState(null);

  const handleCardClick = () => {
    setSelectedLand(data);
  }

  return (
    <div onClick={handleCardClick} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:bg-gray-100">
      <img src={data.image[0]} alt={data.title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
        <p className="text-gray-700 mb-1 text-base">Price: ${data.price}</p>
        <p className="text-gray-700 mb-2 text-base">Location: {data.location}</p>
        <p className="text-green-700 mb-2 text-base">
          {data.isApproved ? 'Approved' : 'Not Approved'}
        </p>
      </div>
    </div>
  );
}

export default LandCard;
