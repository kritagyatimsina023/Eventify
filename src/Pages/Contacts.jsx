import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Contact.css";
import gsap from "gsap";

function Contacts() {
  const t_l_1 = gsap.timeline();
  const animation = () => {
    t_l_1.from("#heading_42", {
      opacity: 0,
      x: -500,
      ease: "power2.in",
      duration: 0.5,
      delay: 0.2,
    });
    t_l_1.from(".logos", {
      opacity: 0,
      y: 300,
      duration: 0.7,
      stagger: 0.3,
    });
    t_l_1.from(".para", {
      opacity: 0,
      x: -300,
      duration: 0.5,
    });
    t_l_1.from("#footer", {
      opacity: 0,
      x: -400,
      duration: 0.4,
      ease: "bounce.out",
    });
  };
  useEffect(() => {
    animation();
  }, []);
  return (
    <div className="text-white">
      <h1 id="heading_42" className="text-center text-3xl">
        Contact us{" "}
      </h1>
      <div className="linking flex justify-center gap-10 mt-10 ">
        <a href="https://www.instagram.com/kritagyatimsina/" target="_blank">
          <FontAwesomeIcon
            className="text-white text-3xl logos"
            icon={faInstagram}
          />
        </a>
        <a
          href="mailto:kritagyatimsina@gamil.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            className="text-white text-3xl logos"
            icon={faEnvelope}
          />
        </a>
        <a href="https://www.facebook.com/login/" target="_blank">
          <FontAwesomeIcon
            className="text-white text-3xl logos"
            icon={faFacebook}
          />
        </a>
      </div>
      <p className="text-center mt-10 para">
        Ph-no:
        <a href="tel:+9840256941" className="text-blue-500 ml-3 mr-1 ">
          9840256941
        </a>
        /
        <a className="text-blue-500 ml-1" href="tel:+9840747540">
          9840747540
        </a>
      </p>
      <footer id="footer" className="text-center mt-10">
        {" "}
        &copy; Privacy Policy | Terms of use
      </footer>
    </div>
  );
}
export default Contacts;
