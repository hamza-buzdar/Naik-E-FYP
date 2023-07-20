import React from 'react'
import './NeedCard.css'
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../../utils/newRequest';
// import { isInputElement } from 'react-router-dom/dist/dom';

const NeedCard = ({item}) => {

    const { isLoading, error, data } = useQuery({
      queryKey: [item.userId],
      queryFn: () =>
        newRequest.get(`/users/${item.userId}`).then((res) => {
          return res.data;
        }),
    });
    return (
      <Link to={`/need/${item._id}`} className="link">
    <div className="needCard">
        <img src={item.cover || "/img/food.png"} alt="" />
        <div className="info">
        {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/no.jpg"} alt="" />
              <span>{data.name}</span>
            </div>
          )}
            <p>{item.desc}</p>
            
        </div>
        <div className="details">
    <span>Avg Amount</span>
    <h2>PKR {item.amount}</h2>



        </div>

    </div>
    </Link>
  );
  
}

export default NeedCard
