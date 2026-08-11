import React, { useEffect, useState } from "react";
import NewVolunteerReq from "../../Components/Admin/NewVolunteerReq";
import ReportsTable from "../../Components/Admin/ReportsTable";
import api from "../../Utilities/axios";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [volunteers, setVolunteers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(`/users`);
        setUsers(res.data);
        const res2 = await api.get(`/volunteers`);
        setVolunteers(res2.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      {/* Header */}
      <header className="bg-white py-4 px-6 sm:px-10">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <p className="text-gray-500 mt-1">
          Approve signups · Review incident reports (Reports tab)
        </p>
      </header>

      {/* Tabs */}
      <div className="mt-6 px-4 sm:px-10 ">
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 rounded-xl overflow-hidden ">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 sm:flex-1 rounded-md transition-colors duration-200 ${
              activeTab === "users"
                ? "bg-pink-400 text-white"
                : "bg-white text-gray-800 hover:bg-pink-100"
            }`}
          >
            Approve New Users
          </button>
          <button
            onClick={() => setActiveTab("volunteers")}
            className={`px-4 py-2 sm:flex-1 rounded-md transition-colors duration-200 ${
              activeTab === "volunteers"
                ? "bg-pink-400 text-white"
                : "bg-white text-gray-800 hover:bg-pink-100"
            }`}
          >
            Approve New Volunteers
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 sm:flex-1 rounded-md transition-colors duration-200 ${
              activeTab === "reports"
                ? "bg-pink-400 text-white"
                : "bg-white text-gray-800 hover:bg-pink-100"
            }`}
          >
            Reports
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-4 sm:px-10 py-6 w-full max-w-full sm:max-w-6xl mx-auto">
        {activeTab === "users" && (
          <NewVolunteerReq users={users} setUsers={setUsers} />
        )}
        {activeTab === "volunteers" && (
          <NewVolunteerReq users={volunteers} setUsers={setVolunteers} />
        )}
        {activeTab === "reports" && <ReportsTable />}
      </main>
    </div>
  );
};

export default Admin;
