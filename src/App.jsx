import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useNavigate } from "react-router";
import LandListings from './pages/landPages/landsPage';
import Navbar from './components/navbar';
import LandDetails from './pages/landPages/landDetails';
import FinancialCalculator from './pages/landPages/Calculator';
import PropertiesPage from './pages/Property/propertyPage';
import PropertyDetails from './pages/Property/propertDetails';

function App() {
  const [count, setCount] = useState(0)


  return (
    < >
<div className=' overflow-hidden'>
<Navbar />
<Routes>
  <Route path='/' element={<LandListings />}/>
    <Route path='/land' element={<LandListings />}/>
    <Route path="/land-details" element={<LandDetails />} />
    <Route path="/calculator" element={<FinancialCalculator />} />
    <Route path="/property" element={<PropertiesPage />} />
    <Route path="/property-details" element={<PropertyDetails />} />

    
  </Routes>
</div>
   
    </>
  )
}

export default App
