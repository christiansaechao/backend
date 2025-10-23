import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import api from "../../utils/api";

export const Signup = () => {
  const { setAuth } = useUserStore((state) => state);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = [];

    if (password !== confirm) {
      newErrors.push("The passwords do not match.");
    }

    if (!email) {
      newErrors.push("No email was provided.");
    }

    if (newErrors.length) {
      setError(newErrors);
      return;
    }

    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const payload = {
        username: username,
        email: email,
        password: password,
      };

      const { data } = await api.post("/auth/signup", payload, options);

      if (data.error) {
        setError(error);
        return;
      }

      if (data.success) {
        setAuth(data.data, data.accessToken);
        navigate("/notes");
      }

      navigate("/notes");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="flex gap-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col text-left bg-white/10 p-10 rounded-xl gap-2"
      >
        {/* Username */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* confirm password */}
        <label htmlFor="confirm">Confirm Password</label>
        <input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          type="password"
          name="password"
        />

        {/* submit button */}
        <button type="submit" className="mt-6">
          Submit
        </button>
      </form>
      {error.length ? (
        <div className="flex flex-col text-red-600 text-left">
          {error.map((err) => (
            <span>X {err}</span>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
