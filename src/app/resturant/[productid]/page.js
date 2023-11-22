"use client";

import React, { useEffect, useState } from "react";
import styles from './productid.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import AR from'../../../../public/AR.png';
import Image from "next/image";
import Hero from "../../../components/Hero/Hero";
import axios from "axios";
import Link from "next/link";
import { toast } from 'react-toastify';
import { useCartData } from "../../../components/context/cart";
import css from './productid.css';
export default function Page(props) {
  const [isTextareaVisible, setTextareaVisible] = useState(true);
  const [products, setProducts] = useState(null);
  const [variations, setVariations] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [textareaValue, setTextareaValue] = useState('');
  const id = props.params.productid;
  const { setIsChanged, isChanged } = useCartData();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://192.168.1.121:3030/product/list/${id}`);
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const fetchVariations = async () => {
    try {
      const response = await axios.get(`http://192.168.1.121:3030/product/variations/${id}`);
      if (response.status === 200) {
        setVariations(response.data);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching variations:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchVariations();
  }, []);

  const calculateTotal = () => {
    let total = parseFloat(products?.price) || 0;
    variations?.forEach((variation) => {
      if (variation.type === "radio") {
        const selectedOption = selectedOptions[variation.title];
        if (selectedOption) {
          total += parseFloat(selectedOption.price);
        }
      } else {
        variation.VariationOptions.forEach((option) => {
          if (selectedOptions[option.id]) {
            total += parseFloat(option.price);
          }
        });
      }
    });
    return (total * quantity).toFixed(2);
  };

  const handleRadioChange = (variationTitle, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [variationTitle]: option,
    }));
  };

  const handleCheckboxChange = (optionId) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = { ...prevSelectedOptions };
      updatedOptions[optionId] = !updatedOptions[optionId];
      return updatedOptions;
    });
  };

  const toggleTextarea = () => {
    setTextareaVisible(!isTextareaVisible);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleAddToCart = async () => {
    try {
      const selectedVariations = [];
      const hasRadioOptions = variations.some((variation) => variation.type === "radio");

      if (hasRadioOptions) {
        let radioOptionSelected = false;
        variations?.forEach((variation) => {
          if (variation.type === "radio" && selectedOptions[variation.title]) {
            const variationData = {
              variationId: variation?.id,
              optionId: selectedOptions[variation?.title].id,
            };
            selectedVariations.push(variationData);
            radioOptionSelected = true;
          }
        });

        if (!radioOptionSelected) {
          console.error('Please select at least one radio option');
          toast.error('Please select at least one radio option');
          return;
        }
      }

      variations?.forEach((variation) => {
        if (variation.type === "multi") {
          variation.VariationOptions.forEach((option) => {
            if (selectedOptions[option?.id]) {
              const variationData = {
                variationId: variation?.id,
                optionId: option?.id,
              };
              selectedVariations.push(variationData);
            }
          });
        }
      });

      const formattedVariations = selectedVariations
        .map((variation) => `{${variation.variationId},${variation.optionId}}`)
        .join(' ');
      const restaurantId = window.localStorage.getItem("menuResturantId");
      const tableId = window.localStorage.getItem("menuTableId");
      const requestBody = {
        restaurantId: restaurantId,
        tableId: tableId,
        coupon: null,
        cartItems: [
          {
            productId: products.id,
            variations: `[${formattedVariations}]`,
            quantity: quantity,
            note: textareaValue,
          },
        ],
      };

      const response = await axios.post('http://192.168.1.121:3030/cart/new', requestBody);
      if (response.status === 200) {
        setIsChanged(!isChanged);
        console.log('Item added to cart');
        toast.success('Item added successfully!');
      } else {
        console.error(`Failed to add item to cart. Status: ${response.status}`);
        toast.error('Something went wrong');
      }

      console.log("Selected Variations (formatted array):", `[${formattedVariations}]`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="">
    {/* slider for single product */}
      { /*<Hero products={products} /> */ }
      <div className="image-container" >
        {/* Assuming the image URL is dynamic and you get it from products */}
        {products && products.img && (
          <Image
            src={products.img} // Replace with the actual property containing the image URL
            alt={products.name}
            width={800}
            height={400}
            style={{width:'100%'}}
          />
        )}
      </div>
      <br />
      <hr />
      <div className='container'>
        <div className="productnamesection container">
          <div className="">
            {products?.name}
            <br />
            <b>{calculateTotal()} JOD</b>
          </div>
          <Link href='https://vodira.com/'> <Image width={50} src={AR} alt="AR"/></Link>
          <div className="counter">
            <span style={{ display: 'flex', alignItems: 'center'}}  className="cursor" onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>-</span>
            <input
              className="custom-input"
              type="number"
              value={quantity}
              onChange={() => {}}
              onKeyDown={(e) => e.preventDefault()}
              step={1}
              onKeyPress={(e) => {
                if (e.key === '0') {
                  const currentValue = parseInt(e.target.value);
                  if (isNaN(currentValue) || currentValue !== 0) {
                    return;
                  }
                  e.preventDefault();
                }
              }}
            />
            <span style={{ display: 'flex', alignItems: 'center'}} className="cursor" onClick={() => setQuantity((prev) => ( prev + 1 ))}>+</span>
          </div>
        </div>
        <div>
          <br />
          <div className="desc container">
            {showFullDescription ? (
              products?.description
            ) : (
              <>
                {products?.description.slice(0, 100)}
                {products?.description.length > 100 && (
                  <span
                    style={{ cursor: 'pointer', color: 'blue' }}
                    onClick={toggleDescription}
                  >
                    {showFullDescription ? 'See Less' : 'See More'}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        <section className="sizeAndExtras">
          <br />
          <br />
          <form className="form">
            {variations?.map((variation, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3>{variation.title}</h3>
                  {variation.type === "radio" ? (
                    <span className="requiredText">Required</span>
                  ) : (
                    <span className="requiredText">Optional</span>
                  )}
                </div>
                {variation.type === "radio" ? (
                  variation.VariationOptions.map((option) => (
                    <div key={option.id}>
                      <label className="label">
                        <span>{option.name}</span>
                        <div className="radioContainer">
                          <input
                            required
                            type="radio"
                            name={variation.title}
                            value={option.id}
                            onChange={() => handleRadioChange(variation?.title, option)}
                            checked={selectedOptions[variation?.title]?.id === option.id}
                          />
                          <span>{option.price} JOD</span>
                        </div>
                      </label>
                      <br />
                      <hr />
                    </div>
                  ))
                ) : (
                  variation?.VariationOptions.map((option) => (
                    <div key={option?.id}>
                      <label className="label">
                        <span>{option?.name}</span>
                        <div className="checkContainer">
                          <input
                            type="checkbox"
                            name="price"
                            value={option.price}
                            onChange={() => handleCheckboxChange(option?.id)}
                            checked={selectedOptions[option?.id]}
                          />
                          <span>{option?.price} JOD</span>
                        </div>
                      </label>
                      <br />
                      <hr />
                    </div>
                  ))
                )}
              </div>
            ))}
          </form>
          <br />
          <div className="requestsContainer">
            <div>
              <span><BiMessageDetail style={{ fontSize: '20px' }} /></span>
              <span>Any Special requests</span>
            </div>
            <span className="addNotes" onClick={toggleTextarea}>Add note</span>
          </div>
          <br />
          <div>
            <textarea
              onChange={handleTextareaChange}
              rows={4}
              style={{ display: isTextareaVisible ? 'block' : 'none', width: '100%', marginLeft: '10px', borderRadius:'5px ', border:'1px solid gray' }}
              placeholder="Enter your note here..."
            />
          </div>
          <div className="arAndCart">
            <span onClick={handleAddToCart} className="addTCartBTN"><AiOutlineShoppingCart />ADD TO CART</span>
          </div>
        </section>
      </div>
    </div>
  );
}
