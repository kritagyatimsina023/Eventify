import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import {
  faEnvelope,
  faArrowRight,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Login({ closelogin }) {
  const { contextSafe } = useGSAP();
  const xMarks = useRef(null);
  const tl2 = gsap.timeline();
  const tl3 = gsap.timeline();
  const naviagte = useNavigate();
  // const [click, setclick] = useState(true);

  const animate = contextSafe(() => {
    tl2.from("#portal", {
      x: 500,
      duration: 0.4,
      delay: 0.1,
    });
    tl2.from(xMarks.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      // delay: 0.1,
    });
    tl2.from("#div_sec > *", {
      x: -100,
      opacity: 0,
      duration: 0.8,
      // delay: 0.5,
      stagger: 0.8,
    });
  });
  const closingAnimation = () => {
    return new Promise((resolve) => {
      tl3.to("#div_sec > *", {
        x: -50,
        duration: 0.4,
        opacity: 0,
        stagger: 0.6,
        onComplete: () => {
          tl3.to(xMarks.current, {
            rotate: 360,
            duration: 0.4,
            delay: 0.1,
            opacity: 0,
          });
          tl3.to("#portal", {
            y: -500,
            duration: 0.4,
            opacity: 0,
            onComplete: resolve,
          });
        },
      });
    });
  };
  useEffect(() => {
    animate(); //stop animation here
  }, []);
  return (
    <div
      id="portal"
      className="absolute top-0 right-0 h-full backdrop-blur-lg cursor-pointer  bg-slate-200"
    >
      <FontAwesomeIcon
        ref={xMarks}
        onClick={async () => {
          await closingAnimation();
          closelogin();
        }}
        id="icons"
        className="text-white  absolute top-2 right-1 text-2xl "
        icon={faXmark}
      />
      <div id="div_sec" className="flex flex-col gap-8 mt-8 px-8 text-xl">
        <Link id="links" to={"/admin"}>
          Admin
        </Link>

        <Link id="links" to={"/login2"}>
          {" "}
          Organizer{" "}
        </Link>
      </div>
      <button
        onClick={() => {
          naviagte("/admin");
        }}
        id="btn"
      >
        Log out
      </button>
    </div>
  );
}

export default Login;
