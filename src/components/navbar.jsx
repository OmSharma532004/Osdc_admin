import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Site Branding */}
        <Link to="/land" className="text-xl font-semibold">
        Admin Portal
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li><Link to="/land">Home</Link></li>
          {/* <li><Link to="/about">About</Link></li> */}
          <li><Link to="/land">Lands</Link></li> 
          <li><Link to="/property">Properties</Link></li>
          <li><Link to="/shares">Shares</Link></li>
          
          {/* <li><Link to="/contact">Contact</Link></li>  */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
