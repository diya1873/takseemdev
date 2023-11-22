"use client"

import MenuHero from '../../components/Hero/MenuHero';
import CategoryHero from '../../components/Hero/categoriesHero';
import ProductsList from './productslist'
import { useEffect,useState } from 'react';

function GetResturantInfo() {
  useEffect(() => {
   const queryStrings = window.location.search;
    const queryString = new URLSearchParams(queryStrings);
    const resturantId = queryString.get('resid');
    const tableId = queryString.get('restableid');


    {/* Reason of this names is to avoid conflict with admin resturantId local storage value */}
    if (resturantId && tableId){
      typeof window !== 'undefined' ? window.localStorage.setItem("menuResturantId",resturantId): null;
      typeof window !== 'undefined' ?window.localStorage.setItem("menuTableId",tableId): null;
    }




// console.log('resturant id ',resturantId);
// console.log(' table id',tableId);
  }, []);

  return (
    <div>
      {/* Your component's content */}
    </div>
  );
}

const Home=()=> {

  GetResturantInfo()
  
  
  return (
    <div className='main mb-5'>
      <MenuHero/>
      <div className=' mt-5'>
      <h6 className='ms-5'>Categories</h6>
      </div>
      <div className=' p-4'>
        <CategoryHero/>
      </div>
      <div className=' mt-5'>
        <h6 className='ms-5'>All Products</h6>
      </div>
      <div className=''>
         
            <ProductsList  />
    
    
      </div>
    </div>
 
  )
}
export default Home