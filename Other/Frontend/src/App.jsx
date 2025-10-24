import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import { useUserStore } from "./store/useUserStore";
import api from "./utils/api";
// Components
import "./App.css";

function App() {
  const { setAccessToken } = useUserStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewToken = async () => {
      try {
        const { data } = await api.get("/auth/refresh", { withCredentials: true });
        setAccessToken(data.accessToken);
      } catch (err) {
        console.error("Session expired", err);
        setAccessToken(null);
        navigate("/login");
      }
    };

    fetchNewToken();
  }, []);

  return (
    <>
      <nav>
        <Link to="notes">My Notes</Link>
        <Link to="new-note">Create New Note</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
