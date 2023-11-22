'use client';

import { useState, useEffect } from 'react';
import './search.css'; // Import the CSS file
import Link from 'next/link';
import { useProductsData } from '../../../components/context/products';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Search() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Parse the current URL to get the query parameter
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParam = urlSearchParams.get('query');
    if (queryParam) {
      setSearchQuery(queryParam);
      // Automatically trigger the search when a query parameter is present in the URL
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    const menuResturantId = localStorage.getItem('menuResturantId');
    try {
      const apiUrl = 'http://192.168.1.121:3030/search/list/';

      // Construct the request body as a JSON object
      const requestBody = {
        query: searchQuery,
        restaurantId: menuResturantId,
      };

      const response = await fetch(apiUrl, {
        method: 'post', // Use POST method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(requestBody), // Convert the JSON object to a string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.categories.length === 0 && data.products.length === 0) {
        // No results found for the search query
        setError('No results found.');
        setSearchResults(null);
      } else {
        setSearchResults(data);
        setError(null);
      }

      // Update the URL with the search query
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('query', searchQuery);
      window.history.pushState(null, '', `?${urlSearchParams.toString()}`);
    } catch (error) {
      setError('Error fetching search results');
      console.error('Error fetching search results:', error);
    }
  };

  const { setCategoryId } = useProductsData();

  const handleFilterProducts = (id) => {
    router.push(`/resturant/`);
    setCategoryId(id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container searchcontainer">
      <div className="input-box">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search here..."
        />
        <button onClick={handleSearch} disabled={!searchQuery} className="button">
          Search
        </button>
      </div>

      {error && <p>{error}</p>}

      {searchResults && (
        <div>
          {searchResults.categories.length > 0 && (
            <div className="category">
              <h2 style={{ marginLeft: '50px' }}>Categories</h2>
              {searchResults.categories.map((category, index) => (
                <div key={index}>
                  <Image
                    src={category.img}
                    alt={category.name}
                    width={100}
                    height={100}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                    onClick={() => handleFilterProducts(category.id)}
                  />
                  <h5>{category.name}</h5>
                </div>
              ))}
            </div>
          )}

          <hr style={{ color: 'gray' }}></hr>

          {searchResults.products.length > 0 && (
            <div>
              <h2 style={{ marginLeft: '50px' }}>Products</h2>
              {searchResults.products.map((product, index) => (
                <Link key={index} className="text-decoration-none" href={`/resturant/${product.id}`}>
                  <div className="card mt-3 m-4 " key={product.id}>
                    <div className=" ">
                      <span style={{ width: '25%' }} className="float-end ">
                        <Image
                          src={product.img}
                          alt={product.name}
                          width={100}
                          height={100}
                          layout="responsive"
                        />
                      </span>
                      <span className="ms-2 row ">
                        <div className="row ">
                          <div className="col ">
                            <h6 className="p-2">{product.name.slice(0, 25)}</h6>
                            <small>
                              {product.description.length > 50 ? (
                                <>{product.description.slice(0, 50)}...</>
                              ) : (
                                product.description
                              )}
                            </small>

                            {product.price !== 0 ? (
                              <span className="float-end text-dark mt-2 mb-1">
                                {product.price} <b className="text-danger"> Jod</b>
                              </span>
                            ) : (
                              <>
                                <span className="float-end text-danger mt-2 mb-1 text-danger">
                                  Price On Selection
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
