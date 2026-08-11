import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import api from "../../Utilities/axios";
import { sendMail } from "../../Utilities/SendMail";

const EditProfile = () => {
  const [user, setUser] = useState({});
  const [preMail, setPreMail] = useState("");
  const [presentMail, setPresentMail] = useState("");
  const [saving, setSaving] = useState(false);
  const [userType, setUserType] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserType(user.type);
    } else {
      setUserType("volunteer");
    }
  }, []);

  useEffect(() => {
    if (!userType || !id) return; // ensure both exist before fetching
    const fetchNote = async () => {
      try {
        if (userType === "user") {
          const res = await api.get(`/users/${id}`);
          setUser(res.data);
          setPreMail(res.data.email);
        } else if (userType === "volunteer") {
          const res = await api.get(`/volunteers/${id}`);
          setUser(res.data);
          setPreMail(res.data.email);
        }
      } catch (error) {
        console.log("Error in fetching note", error);
      }
    };
    fetchNote();
  }, [userType, id]); // include id here

  const handleAccept = async (e, id) => {
    //navigate("/admin");
    e.preventDefault();

    if (!window.confirm("Are you sure you want to save?")) return;

    setSaving(true);

    try {
      // const updateNote = { ...user, request: "accepted" };
      if (userType === "user") {
        const res = await api.put(`/users/${id}`, user);
        setUser(res.data);
        setPresentMail(res.data.email);
        sendMail(
          res.data.email,
          "Your Profile has been updated",
          "Profile Update"
        );
      } else if (userType === "volunteer") {
        const res = await api.put(`/volunteers/${id}`, user);
        setUser(res.data);
        setPresentMail(res.data.email);
        sendMail(
          res.data.email,
          "Your Profile has been updated",
          "Profile Update"
        );
        console.log("ho");
      }

      if (preMail !== presentMail) {
        sendMail(preMail, "Your E=mail has been changed", "Mail change");
      }
    } catch (error) {
      console.log("Error saving the note:", error);
    } finally {
      setSaving(false);
    }
    navigate(`/users/${id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

        <form onSubmit={(e) => handleAccept(e, user._id)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={user.bloodGroup}
              onChange={(e) => setUser({ ...user, bloodGroup: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medical Condition
            </label>
            <textarea
              name="medicalCondition"
              value={user.medicalCondition}
              onChange={(e) =>
                setUser({ ...user, medicalCondition: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Allergies
            </label>
            <textarea
              name="allergies"
              value={user.allergies}
              onChange={(e) => setUser({ ...user, allergies: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="mt-4">
          <NavLink to={`/users/${id}`} className="btn w-full rounded-lg">
            Cancel
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
