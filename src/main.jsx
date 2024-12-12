import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import AdminObj from "./Portal/AdminObj.jsx";

const supabase = createClient(
  "https://nlknuvzgyclncvsyojvy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sa251dnpneWNsbmN2c3lvanZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1Mzk4MTUsImV4cCI6MjA0OTExNTgxNX0.mCeY41wctYBsoBKyqxvTcEACq6RqCh6zemmfBveTWf0"
);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SessionContextProvider supabaseClient={supabase}>
      <AdminObj>
        <App />
      </AdminObj>
    </SessionContextProvider>
  </BrowserRouter>
);
