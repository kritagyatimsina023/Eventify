import React, { useEffect, useRef, useState } from "react";
import Home from "./Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowRight,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import img1 from "./Untitled-2.png";
import "./Header.css";
import Login from "./Login";
const Header = ({ onComplete }) => {
  // console.log(onComplete);
  const [loginTrigger, setloginTrigger] = useState(false);
  const navigate = useNavigate();
  const WelcomeRef = useRef();
  const navRef = useRef();
  const animationCompleted = useRef(false);
  useGSAP(() => {
    const animationFunc = () => {
      if (animationCompleted.current) return;
      const tl1 = gsap.timeline({
        onComplete: () => {
          onComplete();
          animationCompleted.current = true;
        },
      });

      tl1.from(WelcomeRef.current, {
        y: -300,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "bounce.out",
      });
      tl1.from(["#nav > *", "#icons", "#icons_2"], {
        y: -300,
        opacity: 0,
        duration: 1.8,
        stagger: 0.6,
        ease: "bounce.out",
      });
    };
    animationFunc(); // stop this animation here
  }, [onComplete]);

  return (
    <>
      <nav
        id="navigation"
        className="flex justify-between  items-center w-full h-1/4 p-6"
      >
        <img src={img1} ref={WelcomeRef} className="h-36" />
        <FontAwesomeIcon
          id="icons_2"
          className="text-white absolute right-20 top-10 text-2xl cursor-pointer "
          icon={faUser}
          onClick={() => navigate("/register")}
        />

        <FontAwesomeIcon
          id="icons"
          onClick={() => setloginTrigger(!loginTrigger)}
          className="text-white absolute right-10 top-10 text-2xl cursor-pointer "
          icon={faBars}
        />

        <div id="nav" className="  flex gap-20 text-xl cursor-pointer">
          <Link className="nav_comp nav_1" to="/">
            Home
          </Link>
          <Link className="nav_comp nav_3 " to="/events">
            Events
          </Link>
          <Link className="nav_comp nav_4 " to="/contacts">
            Contacts
          </Link>
        </div>
      </nav>
      {loginTrigger && <Login closelogin={() => setloginTrigger(false)} />}
    </>
  );
};

export default Header;
