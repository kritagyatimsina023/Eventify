import React, { useEffect, useState } from "react";
import "./Login2.css";
import { Await, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Passowrd, setPassword] = useState("");
  const [Hovered, setHovered] = useState(false);
  const animation = () => {
    gsap.from("#forms_2 > *", {
      opacity: 0,
      x: -200,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !Email || !Passowrd) {
      alert("please Enter all the field");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, Email, Passowrd);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "user", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        });
      }
      console.log("user register");
      toast.success("User Registered Successfully !", {
        position: "top-center",
      });
      setfirstName("");
      setlastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      //   console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  useEffect(() => {
    animation();
  }, []);

  return (
    <div
      id="divising_1"
      className={`dividing gap-2 ${Hovered ? "Hover" : ""} `}
    >
      <ToastContainer />
      <form id="forms_2" onSubmit={handleRegister}>
        <h1 className="mt-10 text-3xl headings">Login</h1>
        <div className="flex flex-col items-start ml-1 justify-start p-9">
          <label htmlFor="">First name</label>
          <input
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="p-2 w-full px-2 outline-none inputs"
            type="text"
            placeholder="Enter First Name"
          />
        </div>
        <div className="flex flex-col items-start ml-1 justify-start p-9">
          <label htmlFor="">Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="p-2 w-full px-2 outline-none inputs"
            type="text"
            placeholder="Enter Last name"
          />
        </div>
        <div className="flex flex-col items-start ml-1 justify-start p-9">
          <label htmlFor="">Email address</label>
          <input
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="p-2 w-full px-2 outline-none inputs"
            type="email"
            placeholder="Enter Email address"
          />
        </div>
        <div className="flex flex-col items-start ml-1 justify-start p-9">
          <label htmlFor="">Password</label>
          <input
            value={Passowrd}
            onChange={(e) => setPassword(e.target.value)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="p-2 w-full px-2 outline-none inputs"
            type="password"
            placeholder="Enter Password"
          />
        </div>

        <div className="flex items-center justify-center ">
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="btn"
            type="submit"
          >
            Sign up
          </button>
        </div>
        <div className=" gap-4 flex justify-end">
          <p>Already registered :</p>
          <Link className="mr-4 linking" to={"/login2"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
