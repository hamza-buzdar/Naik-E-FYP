import React  from "react"
import "./home.css"
import { Link } from "react-router-dom"
import Slide from "../../components/slide/Slide"
import CategCards from "../../components/categCards/categCards"
import {cards} from "../../data"
import Landing from "./Landing.jpg"
import CardSlideshow from "./CardSlideshow"


const Card = ({ title, link }) => {
    return (
      <div className="card">
        <Link to={link}>{title}</Link>
      </div>
    );
  };

const Home = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    return (
      <div className="needyDash">
        {currentUser && currentUser.isNeedy ? (
            
            <div>

            <center><p style={{padding:'25px', fontSize:'25px'}}> Welcome Dear <span style={{color:'rgb(98 235 197)'}}>{currentUser.name}</span> on your Needy's Dashboard</p></center>
            <div className="left">
          <Card title="My Needs" link="/userneeds" />
          <Card title="Create a Need" link="/create" />
          </div>
          <div className="left">
          <Card title="Process Requests" link="/processrequests" />
          <Card title="Chats" link="/chats" />
          </div>
          {/* <Card title="Card 5" link="/page5" /> */}
        </div>

        
          
        ) : currentUser ? (
          <div>
            <center><p style={{padding:'25px', fontSize:'25px'}}> Welcome Dear <span style={{color:'rgb(98 235 197)'}}>{currentUser.name}</span> on your Donor's Dashboard</p></center>
          <div className="left">
          <Card title="Browse all Needs" link="/needs" />
          <Card title="Process Requests" link="/processrequests" />
          </div>
          <div className="left">
          <Card title="Chats" link="/chats" />
          </div>
          </div>
        ) : (
          
        
          <div className="root-main">
          <img src={Landing} style={{ padding:'0', margin:'0',display:'flex',  width: '100%',height:'auto'}} ></img>
          <h3 style={{position:'absolute',fontSize:'30px',fontFamily:'sans-serif', top:'55%', left:'50%', transform:'translate(-50%, -50%)' }}><span style={{color:'rgb(98 235 197)'}}> Naik-E</span> A Place to Seek and Help</h3>
          <Link to="/register"><button class="joinBtn">To Naik-E</button></Link>
          
          
          </div>
      
        )}
        <CardSlideshow /> 
      </div>
    );
  }
  
  export default Home;

