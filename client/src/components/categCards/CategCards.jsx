import React from 'react'
import "./CategCards.css"
import { Link } from "react-router-dom";


const CategCards = ({item}) => {
  return (
    <Link to="/needs?cat=drink">
    <div className='categCards'>
        <img src={item.img} alt="" />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>

    </div>
    </Link>
  )
}

export default CategCards
