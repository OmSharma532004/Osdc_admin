import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PropertyDetails() {
    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const id = params.get('id');
  const [property, setProperty] = useState(null);

  const fetchPropertyById = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/properties/getPropertyById/${id}`);
      const data = await response.json();
      setProperty(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    }
  };

  useEffect(() => {
    fetchPropertyById();
  }, []);

  return (
    <div className="w-full min-h-screen bg-black mx-auto p-6">
      {property ? (
        <div className="bg-black text-white border-2 flex flex-col items-center justify-center shadow-md rounded-md p-5"> 
          <img src={property.image} alt={property.title} className="h-64 object-cover mb-4 rounded-t-md" />
          <h2 className="text-3xl font-bold mb-3">{property.title}</h2>
          <p className="text-white mb-2">Price: ${property.price}</p>
          <p className="text-white mb-2">Location: {property.location}</p>
          <p className="text-white mb-4">{property.description}</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Why Invest?</h3>
            <p className="text-white">{property.whyInvest}</p>
          </div>
          {property.tenancy && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Tenancy Details</h3>
              <p className="text-white">About: {property.tenancy.about}</p>
              <p className="text-white">Lease Details: {property.tenancy.leaseDetails}</p>
            </div>
          )}
          {property.calculator && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Calculations</h3>
              <p className="text-white">Estimated Rent: ${property.calculator.estimatedRent}</p>
              <p className="text-white">Expected Resale Value: ${property.calculator.expectedResaleValue}</p>
            </div>
          )}
          {property.shares && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Shares</h3>
              <ul className="list-disc list-inside text-white">
                {property.shares.map((share, index) => (
                  <li key={index}>Share {index + 1}: Price ${share.price}, Percentage {share.percentage}%</li>
                ))}
              </ul>
            </div>
          )}
            </div>
      ) : (
        <div>Loading property details...</div>
      )}
    </div>
  );
}

export default PropertyDetails;
