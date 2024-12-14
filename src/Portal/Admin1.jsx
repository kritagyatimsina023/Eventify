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
  const [eventDetails, seteventDetails] = useState([]);

  // Animation function
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

  // Update event status and refresh the list
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

      // Update local state to reflect the new status
      seteventDetails((prevDetails) =>
        prevDetails
          .map((event) => (event.id === eventId ? { ...event, status } : event))
          .filter((event) => event.status !== "rejected")
      );

      // // toast.success(
      // //   `Event ${status === "accepted" ? "accepted" : "rejected"}!`,
      // //   {
      // //     position: "top-left",
      // //   }
      // );
      if (status === "accepted") {
        toast.success("Event accepted"),
          {
            position: "top-left",
          };
      } else if (status === "rejected") {
        toast.error("Event rejected"),
          {
            position: "top-left",
          };
      }
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  // Fetch event data
  const GetData = async () => {
    const user = auth.currentUser;
    if (!user || !eventId) {
      console.log("Error in getting user or event ID");
      return;
    }
    try {
      const eventsRef = collection(firestore, "user_data", user.uid, "events");
      const querySnapshot = await getDocs(eventsRef);

      const events = [];
      querySnapshot.forEach((doc) => {
        const eventData = { id: doc.id, ...doc.data() };
        if (eventData.status !== "rejected") {
          events.push(eventData);
        }
      });

      seteventDetails(events);
    } catch (error) {
      console.error("Error fetching event data:", error.message);
    }
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
                <p className="text-2xl">Venue: {event.venue}</p>
                {event.Starting ? (
                  <p className="text-2xl">Starting Time: {event.Starting}</p>
                ) : (
                  <p className="text-xl">Time not mentioned</p>
                )}
                {event.Ending ? (
                  <p className="text-2xl">Ending Time: {event.Ending}</p>
                ) : (
                  <p className="text-2xl">Ending time not mentioned</p>
                )}
              </div>
              <div className="flex gap-24 justify-center items-center">
                <button
                  className="btn"
                  onClick={() => updateEventStatus(event.id, "accepted")}
                  disabled={event.status === "accepted"}
                  id="btn_1"
                >
                  Accept
                </button>
                <button
                  className="btn"
                  onClick={() => updateEventStatus(event.id, "rejected")}
                  disabled={
                    event.status === "accepted" || event.status === "rejected"
                  }
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
      <ToastContainer />
    </div>
  );
}

export default Admin1;
