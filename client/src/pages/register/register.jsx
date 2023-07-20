import React, { useState } from "react";
import "./register.css"
import newRequest from "../../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import upload from "../../../utils/upload";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isNeedy: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isNeedy: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        
        <div className="left">
          <h1>Create a new account at <span style={{color:' rgb(98 235 197)'}}>Naik-E</span></h1>
          <label htmlFor="">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
          />

          <label htmlFor="">Password</label>
          <input name="password" type="password" placeholder="Password"  onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Country"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          {/* <h1>I am a Needy</h1> */}
          <div className="toggle">
            <label htmlFor="">Are you a needy? Activate It</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="03xxxxxxxxx"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="5"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;