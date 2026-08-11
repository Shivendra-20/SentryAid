import React from "react";

const ViewProfile = () => {
  const user = {
    name: "person 3",
    email: "person1456@gmail.com",
    phone: "",
    address: "",
    bloodGroup: "",
    allergies: "",
    medicalCondition: "",
    type: "user",
    createdAt: "2025-08-10T15:46:02.929+00:00",
    updatedAt: "2025-08-10T16:12:46.061+00:00",
  };

  return (
    <div className="flex justify-center items-center  bg-pink-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-gray-800">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-pink-400 bg-pink-200 text-pink-800 text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold mt-4">{user.name}</h2>
          <p className="text-gray-600">{user.type}</p>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Email:</span>
            <span>{user.email || "—"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Phone:</span>
            <span>{user.phone || "—"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Address:</span>
            <span>{user.address || "—"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Blood Group:</span>
            <span>{user.bloodGroup || "—"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Allergies:</span>
            <span>{user.allergies || "—"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">
              Medical Condition:
            </span>
            <span>{user.medicalCondition || "—"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Created At:</span>
            <span>{new Date(user.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Updated At:</span>
            <span>{new Date(user.updatedAt).toLocaleString()}</span>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6">
          <a
            href="/editprofile"
            className="block w-full text-center bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
