import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function LandDetails() {
  const url = window.location.href;
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const id = params.get('id');
  const [land, setLand] = useState(null);

  const fetchLandsById = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/lands/getLandbyid/${id}`);
      const data = await response.json();
      setLand(data);
    } catch (error) {
      console.error('Error fetching lands:', error);
    }
  };
  const [tenancy, setTenancy] = useState({ about: '', leaseDetails: '' });
  const [addTenancy, setAddTenancy] = useState(false);
const [addCalculations, setAddCalculations] = useState(false);
const [calculatedReturns, setCalculatedReturns] = useState({ estimatedRent:'',expectedResaleValue:'' });
 

  const [propert,setProperty]=useState({  
    tenancy: { about:"", leaseDetails:"" },
    calculator: { estimatedRent: "" , expectedResaleValue: ""},
    landId: id,
    shares: [],
    
  });
const [propertyId, setPropertyId] = useState('');
  const addShares = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/shares/createSharesByTotalPrice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         propertyId: propertyId,
        }),
      });
      const data = await response.json();
      if(response.ok){
        console.log('Shares created:', data);
        alert('Shares created successfully');
      }
    } catch (error) {
      console.error('Error creating shares:', error);
      alert('Error creating shares'+error);
    }
  };


  const approveLand = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/lands/updateLandApproved/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if(response.ok){
        console.log('Land approved:', data);
        alert('Land approved successfully');
      }
    } catch (error) {
      console.error('Error approving land:', error);
      alert('Error approving land'+error);
    }
  };


  const createProperty = async () => {
    try {
      console.log(tenancy);
      console.log(calculatedReturns);
      propert.tenancy=tenancy;
      propert.calculator=calculatedReturns;
      const response = await fetch('http://localhost:4000/api/properties/createProperty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propert),
      });
      const data = await response.json();
      if(response.ok){
        console.log('Property created:', data);
        setPropertyId(data.propertyId);
        alert('Property created successfully');
        approveLand();
        
      }
    
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Error creating property'+error);
    }
  };

  


 

  useEffect(() => {
    fetchLandsById();
    console.log(propertyId);
  }, []);

  // const [tenancy, setTenancy] = useState({});

  return (
    <div className="w-full min-h-screen bg-black mx-auto p-6">
      {land ? (
        <div className="bg-black text-white border-2 flex flex-col items-center justify-center shadow-md rounded-md p-5"> 
          <img src={land.image[0]} alt={land.title} className="h-64 object-cover mb-4 rounded-t-md" />
          <h2 className="text-3xl font-bold mb-3">{land.title}</h2>
          <p className="text-white mb-2">Price: ${land.price}</p>
          <p className="text-white mb-2">Location: {land.location}</p>
          <p className="text-white mb-4">{land.description}</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Why Invest?</h3>
            <p className="text-white">{land.whyInvest}</p>
          </div>
          {land.isApproved ? <p className="text-green-500">Approved</p> : <p className="text-red-500">Not Approved</p>}
          <button onClick={() => setAddTenancy(true)}>Add Tenancy Details</button>
          {addTenancy && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
              <div className='bg-white p-5 rounded flex flex-col items-center justify-center gap-4 relative'>
                <button className="absolute top-2 right-2 text-xl font-bold"   >&times;</button>
                <input value={tenancy.about} type="text" placeholder="About Tenancy" className='text-black ' onChange={(e)=>{
                  setTenancy({ ...tenancy, about: e.target.value });
                  
    
                }}  />
                <input value={tenancy.leaseDetails} type="text" placeholder="Lease Details" className='text-black ' onChange={(e) => {
                  setTenancy({ ...tenancy, leaseDetails: e.target.value });
                 
                }} />
                <button className='text-black ' onClick={() => setAddTenancy(false)}>Save</button>
                <button className="text-black" onClick={() => setAddTenancy(false)}>Cancel</button>
              </div>
            </div>
          )}
          <button onClick={()=>{
            setAddCalculations(true);
          }}>Add Calculated Returns</button>

          {addCalculations && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
              <div className='bg-white p-5 rounded flex flex-col items-center justify-center gap-4 relative'>
                <button className="absolute top-2 right-2 text-xl font-bold" onClick={() => setAddCalculations(false)}>&times;</button>
                <input value={calculatedReturns.estimatedRent} type="number" placeholder="Estimated Rent" className='text-black ' onChange={(e) => {
                  setCalculatedReturns({ ...calculatedReturns, estimatedRent: e.target.value });
                  
                }} />
                <input value={calculatedReturns.expectedResaleValue} type="number" placeholder="Expected Resale Value" className='text-black ' onChange={(e) => {
                  setCalculatedReturns({ ...calculatedReturns, expectedResaleValue: e.target.value });
              
                
                }} />
                <button className='text-black ' onClick={() => setAddCalculations(false)}>Save</button>
                <button className="text-black" onClick={() => setAddCalculations(false)}>Cancel</button>
              </div>
            </div>
          )}
          <button onClick={createProperty}>Create Property</button>
        {
          propertyId && <button onClick={addShares}>Add Shares</button>
        
        }
        </div>
      ) : (
        <div>Loading land details...</div>
      )}
    </div>
  );
}

export default LandDetails;
