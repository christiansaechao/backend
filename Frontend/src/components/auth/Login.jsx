import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store/useUserStore";
import api from "../../utils/api";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserStore((state) => state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const payload = {
        username: username,
        password: password,
      };

      const { data } = await api.post("/auth/login", payload, options);
      if (data.success) {
        setUser(data.data, data.accessToken);
        navigate("/notes");
      }

    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col text-left bg-white/10 p-10 rounded-xl gap-2"
    >
      {/* username */}
      <label htmlFor="username">Username</label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        name="username"
        placeholder="username"
      />

      {/* password */}
      <label htmlFor="password">Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        placeholder="password"
      />
      <button className="mt-6" type="submit">
        Login
      </button>
    </form>
  );
};
