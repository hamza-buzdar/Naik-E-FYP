import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../utils/newRequest";

function Login() {
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { phone, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1 style={{color:'rgb(0 173 238)'}}>Sign in</h1>
        <label htmlFor="">Mobile Number</label>
        <input
          name="phone"
          type="text"
          placeholder="03xxxxxxxxx"
          onChange={(e) => setphone(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" type="submit" >Sign in</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;