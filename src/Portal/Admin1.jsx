import React, { useContext, useEffect, useState } from "react";
import "./Admin1.css";
import gsap from "gsap";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { EventContext } from "../Context/EventContext";
import { app, auth } from "./OrganizerLogin/Firebase";
import { ToastContainer, toast } from "react-toastify";
function Admin1() {
  const firestore = getFirestore(app);
  const { eventId } = useContext(EventContext);
  const [eventDetails, seteventDetails] = useState(null);
  // const [Id, setId] = useState("");
  const animation = () => {
    const internalDiv = document.querySelectorAll(".internal_div");
    const buttons = document.querySelectorAll("#btn_1, #btn_2");

    if (internalDiv.length > 0) {
      gsap.timeline().from(internalDiv, {
        opacity: 0,
        x: -400,
        duration: 0.8,
        delay: 0.4,
        stagger: 0.2,
      });
    }

    if (buttons.length > 0) {
      gsap.from(buttons, {
        opacity: 0,
        y: -400,
        duration: 0.8,
        delay: 0.3,
      });
    }
  };

  // Function to update event status
  const updateEventStatus = async (eventId, status) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user found");
        return;
      }
      const eventDocRef = doc(
        firestore,
        "user_data",
        user.uid,
        "events",
        eventId
      );
      await updateDoc(eventDocRef, { status });
      console.log(`Event ${status}`);
      GetData(); // Refresh the list of events
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };
  const GetData = async () => {
    const user = auth.currentUser;
    if (!user || !eventId) {
      console.log("error in getting id ");
      return;
    }
    try {
      const eventsRef = collection(firestore, "user_data", user.uid, "events");
      const querySnapshot = await getDocs(eventsRef);

      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });

      if (events.length > 0) {
        seteventDetails(events); // Set events as an array
      } else {
        console.log("No events found");
        seteventDetails(null);
      }
    } catch (error) {
      console.log("error", error.message);
    }
    // const ref = doc(firestore, "user_data", eventId);
    // const snap = await getDoc(ref);
    // if (snap.exists()) {
    //   seteventDetails(snap.data());
    //   console.log(snap.data());
    // } else {
    //   console.log("no document");
    // }
  };
  useEffect(() => {
    if (eventId) {
      GetData();
    }

    animation();
  }, [eventId]);

  return (
    <div id="div_admin">
      <h1 className="text-3xl text-white px-4">Pending Events</h1>
      {eventDetails && eventDetails.length > 0 ? (
        eventDetails.map((event) => (
          <div className="internal_div" key={event.id}>
            <div className="flex justify-center" style={{ height: "auto" }}>
              <div className="mt-4">
                <h1 className="text-3xl mt-5">{event.eventName}</h1>
                <p className="mt-5">{event.description}</p>
                <p className="text-2xl p">Venue: {event.venue}</p>
                {event.Starting ? (
                  <p className="text-2xl p">
                    {" "}
                    Starting Time : {event.Starting}{" "}
                  </p>
                ) : (
                  <p className="text-xl p">Time not mentioned</p>
                )}
                {event.Ending ? (
                  <p className="text-2xl p"> Ending Time : {event.Ending} </p>
                ) : (
                  <p className="text-2xl p ">Ending time not mentioned</p>
                )}
              </div>
              {/* <hr id="hr" /> */}
              <div className="flex gap-24 justify-center items-center">
                <button
                  className="btn"
                  onClick={() => {
                    updateEventStatus(event.id, "accepted");
                    toast.success("Events Accepted", {
                      position: "top-left",
                    });
                  }}
                  id="btn_1"
                >
                  Accept
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    updateEventStatus(event.id, "rejected");
                    toast.error("Event rejected !", {
                      position: "top-left",
                    });
                  }}
                  id="btn_2"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-5">
          <span>No events found</span>
        </div>
      )}
      {/* <div id="internal_div">
        <div className="flex justify-center" style={{ height: "auto" }}>
          <div className="mt-4">
            <h1 className="text-3xl mt-5">Hackthon</h1>
            <p className="mt-5">
              A hackathon is an event, typically lasting a few hours to several
              days, where individuals or teams collaborate intensively on a
              specific project, usually related to software development, design,
              or technology innovation. It is a mix of creativity,
              problem-solving, and technical skill under time constraints.The
              primary goal of a hackathon is to encourage innovation.
              Participants are motivated to think outside the box and create
              unique solutions to complex problems. Alongside innovation,
              hackathons serve as excellent opportunities for skill development,
              allowing individuals to apply their knowledge in real-world
              scenarios while also learning from peers and mentors. They are
              also excellent networking platforms, bringing together individuals
              from diverse backgrounds, including developers, designers,
              business strategists, and industry experts. Additionally, many
              hackathons act as incubators for new ideas, with projects
              sometimes evolving into successful startups or products.
            </p>
          </div>
          <hr id="hr" />
          <div className="flex  gap-24 justify-center items-center">
            <button id="btn_1">Accept</button>
            <button id="btn_2">Reject</button>
          </div>
        </div>
      </div> */}
      <ToastContainer />
    </div>
  );
}

export default Admin1;
