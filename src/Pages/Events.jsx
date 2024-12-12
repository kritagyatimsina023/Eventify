import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
import { auth, app } from "../Portal/OrganizerLogin/Firebase";
import "./Events.css";

function Events() {
  const [acceptedEvents, setAcceptedEvents] = useState([]);
  const firestore = getFirestore(app);

  const fetchAcceptedEvents = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user found");
        return;
      }
      const eventsRef = collection(firestore, "user_data", user.uid, "events");
      const q = query(eventsRef, where("status", "==", "accepted"));
      const querySnapshot = await getDocs(q);

      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      setAcceptedEvents(events);
    } catch (error) {
      console.error("Error fetching accepted events:", error);
    }
  };

  useEffect(() => {
    fetchAcceptedEvents();
  }, []);

  return (
    <div className="h-full w-full">
      <h1 className="text-3xl text-center mt-5"> Events</h1>
      {acceptedEvents.length > 0 ? (
        acceptedEvents.map((event) => (
          <div
            key={event.id}
            className="event-card p-4 m-4 bg-transparent keyEvent rounded"
          >
            <h2 className="text-2xl font-bold">{event.eventName}</h2>
            <p>{event.description}</p>
            <p>Venue: {event.venue}</p>
            <p>Starting: {event.Starting || "N/A"}</p>
            <p>Ending: {event.Ending || "N/A"}</p>
          </div>
        ))
      ) : (
        <p className="text-center mt-5">No events yet.</p>
      )}
    </div>
  );
}

export default Events;
