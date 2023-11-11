import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

const Navbar: React.FC<any> = () => {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
    </ul>
    </div>
  );
};

export default Navbar;