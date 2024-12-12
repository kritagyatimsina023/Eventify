import React, { useEffect, useState } from "react";
import "./Login2.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { auth } from "./Firebase";
import { ToastContainer, toast } from "react-toastify";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Login2() {
  const [Hovered, setHovered] = useState(false);
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();
  const animation = () => {
    gsap.from("#heading_10", {
      opacity: 0,
      y: -300,
      duration: 0.6,
      delay: 0.1,
      ease: "bounce.in",
    });
    gsap.from("#forms > *", {
      opacity: 0,
      duration: 0.6,
      stagger: 0.4,
      ease: "power2.in",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, Email, password);
      console.log("User logged in successfully");
      toast.success("User logged in Successfully !", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
    }
    naviagte("/organizer");
  };
  useEffect(() => {
    animation();
  }, []);
  return (
    <div
      id="divising"
      className={`dividing  gap-10  ${Hovered ? "Hover" : ""} `}
    >
      <ToastContainer />
      <form id="forms" action="" onSubmit={handleSubmit}>
        <h1 id="heading_10" className="mt-10 text-3xl headings">
          Login
        </h1>
        <div className="flex flex-col items-start ml-1 justify-start p-9">
          <label htmlFor="">Email Address</label>
          <input
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="p-2 w-full px-2 outline-none inputs"
            type="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="flex flex-col items-start ml-1 justify-start p-9">
          <label htmlFor="">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="p-2 w-full px-2 outline-none inputs"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="flex items-center justify-center ">
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="btn"
            type="submit"
          >
            Submit
          </button>
        </div>
        <div className=" gap-4 flex justify-end">
          <p>New user :</p>
          <Link className="mr-4 linking" to={"/register"}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Login2;
