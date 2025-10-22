import { useState } from "react";
import { Outlet, Link, Navigate } from "react-router";
import { useUserStore } from "../store/useUserStore";

export const Protected = () => {
  const { user, accessToken } = useUserStore((state) => state);

  console.log(user, accessToken);

  if (!user) {
    return <Navigate to="login" replace />;
  }

  return (
    <div>
      <navbar>
        <Link to="notes">My Notes</Link>
        <Link to="new-note">Create New Note</Link>
      </navbar>
      <Outlet />
    </div>
  );
};
