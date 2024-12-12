import React, { useContext, useEffect, useState } from "react";
import "./Organizer.css";
import Calendar from "./Calendar";
import { app, auth, db } from "./OrganizerLogin/Firebase";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../Context/EventContext";
const firestore = getFirestore(app);

function Organizer() {
  const navigate = useNavigate();
  const { setEventId } = useContext(EventContext);
  const [userDetails, setUserDetails] = useState(null);
  const [EventName, setEventName] = useState("");
  const [Member, setMember] = useState("");
  const [Description, setDescription] = useState("");
  const [Venue, setVenue] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [docId, setdocId] = useState("");
  const SelectVenue = (e) => {
    setVenue(e.target.value);
  };
  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
        // setEventId(user.uid);
      } else {
        console.log("user is not logged in ");
      }
    });
  };
  const fetchEventData = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.log("no user found");
        return;
      }
      const docRef = await addDoc(
        collection(firestore, "user_data", user.uid, "events"),
        {
          eventName: EventName,
          eventmember: Member,
          description: Description,
          venue: Venue,
          Starting: startTime,
          Ending: endTime,
          status:"pending"
        }
      );
      setdocId(docRef.id);
      console.log(docRef.id);
      toast.success("Submitted! Please wait for response", {
        position: "top-center",
      });
      setEventId(docRef.id);
    } catch (error) {
      console.log("no data found", error);
    }
  };
  useEffect(() => {
    fetchData();
    toast.success("User logged in Successfully !", {
      position: "top-center",
    });
  }, []);
  const loggout = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut();
      navigate("/login2");
    } catch (error) {
      console.log("error logging out", error.message);
    }
  };
  return (
    <div id="dives" className="text-white">
      {userDetails ? (
        <div className="text-white flex justify-center text-2xl">
          <h1>
            Welcome {userDetails.firstName} {userDetails.lastName}
          </h1>
        </div>
      ) : (
        <div className="text-white flex justify-center text-2xl">
          <p>Loading......</p>
        </div>
      )}

      <ToastContainer />
      <form id="form" action="">
        <div className="flex flex-col justify-center items-start ">
          <span>Event Name</span>
          <input
            value={EventName}
            onChange={(e) => setEventName(e.target.value)}
            id="inputs"
            type="text"
            placeholder=""
          />

          <span>Team Member</span>
          <input
            id="inputs"
            value={Member}
            onChange={(e) => setMember(e.target.value)}
            type="text"
            className="bg-transparent"
            placeholder=""
          />
          <span>About Events</span>
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            name=""
            id=""
            placeholder="In 100 words"
          ></textarea>

          <span>Venue</span>
          <select name="" value={Venue} onChange={SelectVenue} id="select">
            <option value="" className="text-white" disabled>
              -- Choose an option --
            </option>
            <option value="Hall 1">Hall 1</option>
            <option value="Hall 2">Hall 2</option>
            <option value="Hall 3">Hall 3</option>
            <option value="Lab 1">Lab 1</option>
            <option value="Lab 2">Lab 2</option>
          </select>

          <span>Starting Time </span>
          <input
            value={startTime}
            onChange={(e) => setstartTime(e.target.value)}
            id="inputs"
            type="text"
            placeholder="Starting Time (10:00)"
          />

          <span>Ending Time</span>
          <input
            value={endTime}
            onChange={(e) => setendTime(e.target.value)}
            id="inputs"
            type="text"
            placeholder="Ending Time (12:00)"
          />

          <div>
            <button onClick={fetchEventData} type="button" className="btns_3">
              Submit
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={loggout} className="buttons_1">
            Log out
          </button>
        </div>
      </form>
      <div className="text-black h-full mt-56 bg-gray-500 ">
        {/* <Calendar /> */}
      </div>
    </div>
  );
}

export default Organizer;
