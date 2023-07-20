import React, { useState, useEffect, useRef }  from "react";
import "./needs.css"
import {needs} from "../../data";
import NeedCard from "../../components/needCard/needCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";
import { useLocation } from "react-router-dom";


const Needs = () => {

    const [open,setOpen]= useState(false)
    const [sort,setSort]= useState('sales')


    const { search } = useLocation();

    const { isLoading, error, data, refetch } = useQuery({
      queryKey: ["needs"],
      queryFn: () =>
        newRequest
          (
            "/needs"
          )
          .then((res) => {
            return res.data;
          }),
    });
  
    console.log(data);




    const reSort = (type) => {
        setSort(type);
        setOpen(false);
      };
      

      useEffect(() => {
        refetch();
      }, [sort]);

      const apply = () => {
        refetch();
      };
    

    return(
        <div className='needs'>

        <div className="container">
            <span className="breadcrumbs"> </span>
            <h1>Needs around you to help solve them out.</h1>
            
        <div className="menu"></div>
        {/* <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src="./img/down.png" alt="" onClick={()=>setOpen(!open)}/>
            {open && (
             <div className="rightMenu">
             {sort === "sales" ? (
               <span onClick={() => reSort("createdAt")}>Newest</span>
             ) : (
               <span onClick={() => reSort("sales")}>Best Selling</span>
               )}
           </div>
           )}
        </div> */}
        </div>
<div className="cards">
{isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((need) => <NeedCard key={need._id} item={need} />)}
</div>
        </div>
    )
}

export default Needs