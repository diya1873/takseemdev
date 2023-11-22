"use client"
import React, { useState } from 'react';
import './faq.css';
import Image from 'next/image';

const AccordionItem = ({ title, content }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className="accordion-item">
      <button
        onClick={toggleAccordion}
        aria-expanded={isExpanded}
        className={`accordion-button ${isExpanded ? 'expanded' : ''}`}
      >
        <span className="accordion-title">{title}</span>
        <span className="icon" aria-hidden="true"></span>
      </button>
      <div className={`accordion-content ${isExpanded ? 'expanded' : ''}`}>
        <p>{content}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      id: 1,
      title: 'Why is the moon sometimes out during the day?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.',
    },
    {
      id: 1,
      title: 'Why is the moon sometimes out during the day?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.',
    },
    {
      id: 1,
      title: 'Why is the moon sometimes out during the day?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.',
    },
    // Add more FAQ items as needed
  ];

  return (
    <div className="faqcontainer">
      <div className='container d-flex justify-content-center'>
        <Image src="/images/faq2.png" height={500} width={500} alt='faq img'/>
      </div>
      <h2>Frequently Asked Questions</h2>
      <div className="accordion">
        {faqData.map((item) => (
          <AccordionItem key={item.id} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
