import React, { useContext, useEffect, useRef, useState } from "react";
import "./Admin.css";
import img from "./logo.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Navigate, useNavigate } from "react-router-dom";
import { Datatransfer } from "./AdminObj";

function Admin({ click }) {
  console.log(click);
  const data = useContext(Datatransfer);
  console.log(data);
  const [isHovered, setisHovered] = useState(false);
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();
  const boxesRef = useRef(null);
  const animations = () => {
    gsap.from("#divs", {
      y: -800,
      opacity: 0,
      duration: 0.9,
      delay: 0.2,
      ease: "power4.out",
    });
    gsap.from("#img_tag", {
      opacity: 0,
      rotate: 360,
      duration: 0.9,
      delay: 0.5,
      ease: "back.out",
    });
    gsap.from(boxesRef.current.querySelectorAll("input"), {
      x: -300,
      opacity: 0,
      ease: "bounce.out",
      duration: 0.9,
      delay: 0.6,
    });
  };
  const handlelogin = () => {
    if (!name || !Email || !password) {
      alert("Please enter all the fields");
      return;
    }

    // Check if name and email match (case-insensitive)
    const userFound = data.Fullname.some(
      (curr) => curr.toLowerCase() === name.toLowerCase()
    );
    const emailFound = data.Email.some(
      (curr) => curr.toLowerCase() === Email.toLowerCase()
    );

    if (!userFound || !emailFound) {
      alert("Incorrect user");
      return;
    }

    // Check if the password matches
    if (data.password !== password) {
      alert("Incorrect password");
      return;
    }

    // Reset state after successful login
    setName("");
    setEmail("");
    setPassword("");
    setContact("");

    navigate("/admin1");
  };

  useEffect(() => {
    animations();
  }, []);

  return (
    <div id="divs" className={`bg-transparent ${isHovered ? "hovered" : ""}`}>
      <img src={img} id="img_tag" />
      <div
        ref={boxesRef}
        id="divs_1"
        className=" flex flex-col justify-start items-start"
      >
        <div
          id="internal"
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => setisHovered(false)}
        >
          <span>Full Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter full name"
          />
        </div>
        <div
          id="internal"
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => setisHovered(false)}
        >
          <span>Email</span>
          <input
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name=""
            id="emailId"
          />
        </div>
        <div
          id="internal"
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => setisHovered(false)}
        >
          <span>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name=""
            id="PasswordId"
          />
        </div>

        <button
          onClick={() => {
            handlelogin();
          }}
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => setisHovered(false)}
          id="btn_login"
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default Admin;
