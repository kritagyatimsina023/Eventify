import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import moment from "moment-timezone"; // Import moment-timezone
import "react-datetime-picker/dist/DateTimePicker.css";
import "./Calendar.css";

function Calendar() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [eventName, seteventName] = useState("");
  const [eventDescription, seteventDescription] = useState("");

  async function createCalendarEvent() {
    if (!start || !end || !eventName || !eventDescription) {
      alert(
        "Please provide all the details (event name, description, start and end time)."
      );
      return;
    }

    // Convert start and end times to Nepali Time (NPT)
    const nepaliStart = moment(start)
      .tz("Asia/Kathmandu", true) // Convert to NPT
      .format("YYYY-MM-DDTHH:mm:ssZ"); // ISO format with timezone offset
    const nepaliEnd = moment(end)
      .tz("Asia/Kathmandu", true) // Convert to NPT
      .format("YYYY-MM-DDTHH:mm:ssZ"); // ISO format with timezone offset

    console.log("Start Time in NPT:", nepaliStart);
    console.log("End Time in NPT:", nepaliEnd);

    // Placeholder for event creation logic
    alert("Event created! Event details logged in the console.");
    console.log({
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: nepaliStart,
        timeZone: "Asia/Kathmandu",
      },
      end: {
        dateTime: nepaliEnd,
        timeZone: "Asia/Kathmandu",
      },
    });
  }

  return (
    <div id="entire_div" className="text-black flex flex-row justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-white text-2xl">Create Your Event</h2>
        <p className="text-white text-xl">Start of your event</p>
        <DateTimePicker
          id="dates"
          onChange={setStart}
          value={start}
          format="yyyy-MM-dd hh:mm a" // 12-hour format with AM/PM
          clearIcon={null}
        />
        <p className="text-xl text-white">End of your event</p>
        <DateTimePicker
          onChange={setEnd}
          value={end}
          format="yyyy-MM-dd hh:mm a" // 12-hour format with AM/PM
          clearIcon={null}
        />
        <div className="flex flex-col items-center gap-2">
          <p className="text-white">Event Name</p>
          <input
            id="inputs_2"
            type="text"
            onChange={(e) => seteventName(e.target.value)}
          />
          <p className="text-white">Event Description</p>
          <input
            id="inputs_2"
            type="text"
            onChange={(e) => seteventDescription(e.target.value)}
          />
          <button id="btns_1" onClick={createCalendarEvent}>
            Create Calendar Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
