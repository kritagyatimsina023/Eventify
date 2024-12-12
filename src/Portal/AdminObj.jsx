import React, { createContext } from "react";

export const Datatransfer = createContext();

function AdminObj({ children }) {
  const obj = {
    Fullname: ["Kritagya Timsina", "Eventify"],
    Email: ["eventify123@gmail.com", "kritagyatimsina@gmail.com"],
    password: "khwopa12",
  };
  return (
    <div>
      <Datatransfer.Provider value={obj}>{children}</Datatransfer.Provider>
    </div>
  );
}

export default AdminObj;
