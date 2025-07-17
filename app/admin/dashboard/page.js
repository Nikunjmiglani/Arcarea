// app/admin/dashboard/page.js
"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, services: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [userRes, serviceRes] = await Promise.all([
        fetch("/api/admin/users/count"),
        fetch("/api/admin/services/count"),
      ]);
      const users = await userRes.json();
      const services = await serviceRes.json();
      setStats({ users: users.count, services: services.count });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">{stats.users}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-semibold">Total Services</h2>
          <p className="text-2xl">{stats.services}</p>
        </div>
      </div>
    </div>
  );
}
