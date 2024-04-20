import React, { useState, useEffect } from 'react';
import LandCard from './landCard';
import { Link } from 'react-router-dom';
function LandListings() {

  const [selectedLand, setSelectedLand] = useState(null);

  const handleCardClick = (data) => {
    setSelectedLand(data);
  }
  const [lands, setLands] = useState([]);

  const fetchLands = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/lands/getLands');
      const data = await response.json();
      setLands(data);
    } catch (error) {
      console.error('Error fetching lands:', error);
    }
  }


  // Dummy Data
  const dummyLands = [
    {
      _id: '1',
      title: "Prime Lakeside Property",
      description: "Beautiful plot with stunning lake views.",
      price: 250000,
      location: "Lakewood, CA",
      image: ["https://via.placeholder.com/300"], 
      size: 2000,
      whyInvest: "Potential for development or a peaceful retreat."
    },
    {
      _id: '2',
      title: "Spacious Urban Lot",
      description: "Ready for your dream home or commercial project.",
      price: 120000,
      location: "Metropolis, NY",
      image: ["https://via.placeholder.com/300"], 
      size: 1500,
      whyInvest: "Central location with excellent infrastructure."
    },
    // Add more dummy land objects here...
  ];

  useEffect(() => {
    // Prioritize fetching data from backend if available
    fetchLands();
  }, []);

  // A simple function to determine if you should fetch from backend 
  const shouldFetchFromBackend = () => {
    // Replace this logic with your actual backend availability check
    return false; 
  }

  return (
    <div className=" w-full  min-h-screen bg-black text-white flex flex-col items-center justify-center  mx-auto p-8 shadow-lg"> 
    <h1 className="text-4xl font-bold mb-8 text-blue-500">Available Land Listings</h1> 
    <div className=" flex flex-row items-center justify-center gap-8 ">
    {lands.map(land => (
          <Link to={`/land-details?id=${land._id}`} key={land._id}> {/* Wrap LandCard with Link */}
            <LandCard data={land} />
          </Link>
        ))}
    </div>
  </div>
  );
}

export default LandListings;
