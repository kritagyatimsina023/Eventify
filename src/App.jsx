import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Contacts from "./Pages/Contacts";
import Events from "./Pages/Events";
import Login from "./Components/Login";
import Admin from "./Portal/Admin";
import Admin1 from "./Portal/Admin1";
import Organizer from "./Portal/Organizer";
import { Datatransfer } from "./Portal/AdminObj";
import Login2 from "./Portal/OrganizerLogin/Login2";
import Register from "./Portal/OrganizerLogin/Register";
import { ToastContainer } from "react-toastify";
import { auth } from "./Portal/OrganizerLogin/Firebase";
import { EventContext, EventProvider } from "./Context/EventContext";

function App() {
  const data = useContext(Datatransfer);
  const [user, setUser] = useState();
  console.log(data);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [showHome, setshowHome] = useState(false);
  console.log();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <EventProvider>
      <div>
        <Header
          onComplete={() => {
            if (!triggerAnimation) {
              setTriggerAnimation(true);
              setshowHome(true);
            }
          }}
        />
        <Routes>
          {showHome && (
            <Route
              path="/"
              element={<Home triggeringAnimation={triggerAnimation} />}
            />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin1" element={<Admin1 />} />
          <Route path="/organizer" element={<Organizer />} />
          <Route
            path="/login2"
            element={user ? <Navigate to={"/organizer"} /> : <Login2 />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </EventProvider>
  );
}

export default App;
