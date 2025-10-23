import { useState } from "react";
import { Outlet, Link, Navigate } from "react-router";
import { useUserStore } from "../store/useUserStore";

export const Protected = () => {
  const { user, accessToken } = useUserStore((state) => state);

  if (!user) {
    return <Navigate to="login" replace />;
  }

  return <Outlet />;
};
