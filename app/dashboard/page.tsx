"use client";

import withAuth from "@/components/protected-route";
import React from "react";

const DashboardPage = () => {
  return <div>Dashboard Page</div>;
};

export default withAuth(DashboardPage);
