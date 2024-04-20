
import React, { useState, useEffect } from 'react';
import PropertyCard from './propertCard';
import { Link } from 'react-router-dom';

function PropertyListings() {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/properties/getProperty');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
  <>
    <div className="w-full min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-500">Available Property Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {properties.map(property => (
          <Link to={`/property-details?id=${property._id}`} key={property._id}>
            <PropertyCard data={property} />
          </Link>
        ))}
      </div>
    </div>
  </>
  );
}

export default PropertyListings;
