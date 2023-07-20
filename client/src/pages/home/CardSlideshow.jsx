import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./cardslideshow.css"

const CardSlideshow = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Naik-E was great and it helped me alot.', name: 'Nazeer'  },
    { id: 2, title: 'I am from Khairpur and Naik-E as a platform helped overcome my financial difficulty.', name: 'Ali' },
    { id: 3, title: 'Naik-E is like GoFundMe, and with this platform you can easily contact with the people in need.', name: 'Murtaza' },
    { id: 4, title: 'Everything is good. but the interface is not much updated, but still a good one.', name: 'Hamza' },
    { id: 5, title: 'Everything is good. but the interface is not much updated, but still a good one.', name: 'Moazzam' },
    { id: 6, title: 'Everything is good. but the interface is not much updated, but still a good one.', name: 'Ayyub' },
  ]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStartIndex((prevIndex) =>
        prevIndex === cards.length - 4 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, [cards]);

  const visibleCards = cards.slice(startIndex, startIndex + 4);

  return (
    <div id='stories' className="card-slideshow">
      <center><h3 style={{fontFamily:'sans-serif', fontWeight:'bolder'}}>Stories</h3></center>
        <div>
      {visibleCards.map((card) => (
    <article key={card.id} className="review">
    

      
    <h4 className="author">{card.name}</h4>
<div>
    <span className="quote-icon">
        <FaQuoteLeft />
      </span>
    <p className="info">{card.title}</p>
    <span className="quote-icon-right">
        <FaQuoteRight />
      </span>
      </div>
  </article>

          ))}
        </div>
        
    </div>
  );
};

export default CardSlideshow;
