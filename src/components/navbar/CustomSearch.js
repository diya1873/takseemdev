"use client"
// CustomSearch.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './NavBarc.css'
const CustomSearch = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <>
      <div className="search-box float-end">
    <button className="btn-search"><FaSearch className='fas fa-search'/></button>
    <input type="text" className="input-search" placeholder="Type to Search..."/>
  </div>
    </>
  );
};

export default CustomSearch;
