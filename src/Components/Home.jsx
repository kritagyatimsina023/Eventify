import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import "./Home.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";

const Home = ({ triggeringAnimation }) => {
  const [text, setText] = useState("Welcome to Eventify");
  const textRef = useRef(null);
  const descriptionRef = useRef(null);
  const pRef = useRef(null);
  const imgRef = useRef(null);
  const iconRef = useRef(null);
  const learnRef = useRef(null);
  const divRef = useRef(null);
  const navigate = useNavigate();
  const { contextSafe } = useGSAP();
  const animate = contextSafe(() => {
    if (triggeringAnimation) {
      const words = textRef.current.querySelectorAll("#splitted");
      const tl = gsap.timeline();
      const animate = () => {
        tl.fromTo(
          words,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.3,
            ease: "power4.out",
            // repeat: -1,
          }
        );
        tl.from([divRef.current, "#div_2"], {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: 0.4,
          ease: "bounce.inOut",
        });

        tl.from([descriptionRef.current, "#description_2"], {
          x: -100,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });
        tl.from([pRef.current, "#p_2"], {
          x: -100,
          opacity: 0,
          duration: 0.8,
          ease: "bounce.out",
        });
        tl.from([imgRef.current, "#img_2"], {
          y: 100,
          duration: 1,
          delay: 0.5,
          opacity: 0,
        });
        tl.from([iconRef.current, learnRef.current, "#i_2", "#learn"], {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: 0.5,
        });
      };
      animate();
    }
  }, [triggeringAnimation]);
  useEffect(() => {
    if (triggeringAnimation) {
      animate();
    }
  }, [triggeringAnimation]);

  // useGSAP(() => {
  //   if (triggeringAnimation) {
  //     console.log(triggeringAnimation);
  //     const words = textRef.current.querySelectorAll("#splitted");
  //     const tl = gsap.timeline();
  //     const animate = () => {
  //       tl.fromTo(
  //         words,
  //         { opacity: 0, y: 20 }, // Start state
  //         {
  //           opacity: 1,
  //           y: 0, // End state
  //           duration: 0.5,
  //           stagger: 0.3, // Animate words one by one
  //           ease: "power4.out",
  //           // repeat: -1,
  //         }
  //       );
  //       tl.from(divRef.current, {
  //         y: 100,
  //         opacity: 0,
  //         duration: 1,
  //         delay: 0.4,
  //         ease: "bounce.inOut",
  //       });

  //       tl.from(descriptionRef.current, {
  //         x: -100,
  //         opacity: 0,
  //         duration: 0.7,`
  //         ease: "power3.out",
  //       });
  //       tl.from(pRef.current, {
  //         x: -100,
  //         opacity: 0,
  //         duration: 0.8,
  //         ease: "bounce.out",
  //       });
  //       tl.from(imgRef.current, {
  //         y: 100,
  //         duration: 1,
  //         delay: 0.5,
  //         opacity: 0,
  //       });
  //       tl.from([iconRef.current, learnRef.current], {
  //         y: 100,
  //         opacity: 0,
  //         duration: 1,
  //         delay: 0.5,
  //       });
  //     };
  //     // animate();
  //   }
  // }, [triggeringAnimation]);

  return (
    <div className=" relative w-full   h-screen  flex flex-col items-start justify-center">
      <div
        className=" text-white absolute top-8 left-1/4  text-center -mt-5 text-2xl "
        ref={textRef}
      >
        {text.split("").map((word, index) => (
          <span key={index} id="splitted" className="inline-block mr-2 ">
            {word}
          </span>
        ))}
      </div>
      <div
        id="outer"
        className="  absolute top-40 h-full flex justify-evenly w-full"
      >
        <div id="div_1" ref={divRef} className="  w-1/3 h-1/4 p-8 m-8  ">
          <h1 ref={descriptionRef} className="text-5xl text-center">
            Description
          </h1>
          <div id="division" className="flex  justify-evenly mt-8">
            <p id="p_1" ref={pRef}>
              Eventify is a web-based application designed to revolutionize
              event space management. The platform empowers organizers to
              seamlessly book venues for their events while ensuring efficient
              conflict detection and smooth coordination.
            </p>
            <img
              ref={imgRef}
              id="img"
              className="h-44 cursor-pointer"
              src="https://images.unsplash.com/photo-1653669487221-252f32c53f2c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <FontAwesomeIcon
            id="i"
            ref={iconRef}
            className="text-white"
            icon={faArrowRight}
          />
          <span ref={learnRef} className="ml-4 text-2xl">
            Learn More
          </span>
        </div>

        <div id="div_2" className="w-1/3 h-1/4 p-8 m-8  ">
          <h1 id="description_2" className="text-5xl text-center">
            Events
          </h1>
          <div id="division" className="flex  justify-evenly mt-8">
            <p id="p_2">
              Eventify app represent organized gatherings or activities
              scheduled by users within managed spaces. Each event is defined by
              details such as the event name, description, date, time, and
              participant count.
            </p>
            <img
              id="img_2"
              onClick={() => navigate("/events")}
              className="h-44 cursor-pointer"
              src="https://plus.unsplash.com/premium_photo-1681487469745-91d1d8a5836b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <FontAwesomeIcon
            onClick={() => navigate("/events")}
            id="i_2"
            className="text-white"
            icon={faArrowRight}
          />
          <span id="learn" className="ml-4 text-2xl">
            Check out Events
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
