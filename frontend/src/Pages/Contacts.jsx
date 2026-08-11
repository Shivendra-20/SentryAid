import React from "react";
import UserNavbar from "../Components/Navbar/UserNavbar"; // Assuming UserNavbar is your sidebar

const Contacts = () => {
  // Placeholder for contacts data
  const contacts = [
    { id: 1, name: "John Doe", relationship: "Family", phone: "555-1234" },
    { id: 2, name: "Jane Smith", relationship: "Friend", phone: "555-5678" },
  ];

  return (
    <div className="flex">
      {/* Sidebar Placeholder */}
      <UserNavbar />

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Emergency Contacts</h1>

        {/* Add New Contact Section/Button */}
        <div className="mb-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Contact
          </button>
          {/* You would typically have a modal or form appear here */}
        </div>

        {/* Contacts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{contact.name}</h3>
              <p className="text-gray-600 mb-1">Relationship: {contact.relationship}</p>
              <p className="text-gray-600">Phone: {contact.phone}</p>
              <div className="mt-4 flex space-x-4">
                <button className="text-blue-500 hover:text-blue-700">Edit</button>
                <button className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
