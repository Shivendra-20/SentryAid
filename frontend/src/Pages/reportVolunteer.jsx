import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import api from "../Utilities/axios";
import "react-toastify/dist/ReactToastify.css";

const ReportVolunteer = () => {
  const { volunteerId } = useParams();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [volunteer, setVolunteer] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    message: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserId(storedUser?._id);
  }, []);

  // Fetch volunteer data
  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const res = await api.get(
          `/volunteers/${volunteerId}`
        );
        setVolunteer(res.data);
      } catch (error) {
        console.error("Failed to fetch volunteer data:", error);
        toast.error("Failed to load volunteer information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVolunteerData();
  }, [volunteerId]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsUserLoading(true);
        const res = await api.get(
          `/users/${userId}`
        );
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        if (error.response?.status === 404) {
          toast.error("User not found in database");
        } else {
          toast.error("Failed to load user information");
        }
      } finally {
        setIsUserLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.title.trim() ||
      !formData.category ||
      !formData.message.trim()
    ) {
      toast.error("All fields should be filled!", { position: "top-right" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Report data
      const reportData = {
        reporterId: userId,
        reporterName: user?.name || "Unknown User",
        reporterEmail: user?.email || "No email",
        volunteerId: volunteerId,
        volunteerName: volunteer.name,
        volunteerEmail: volunteer.email,
        title: formData.title,
        category: formData.category,
        message: formData.message,
      };

      const response = await api.post(
        `/reports`,
        reportData
      );

      // Deduct score from volunteer
      const res = await api.get(
        `/volunteers/${volunteerId}`
      );
      const fetchedVolunteer = res.data;
      const updatedVolunteer = {
        ...fetchedVolunteer,
        score: fetchedVolunteer.score - 5,
      };
      await api.put(
        `/volunteers/${volunteerId}`,
        updatedVolunteer
      );

      if (response.data.success) {
        toast.success("Report submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setFormData({ title: "", category: "", message: "" });

        setTimeout(() => {
          navigate(`/users/${userId}/volunteerRanking`);
        }, 2000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to submit report:", error);
      toast.error("Failed to submit report. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/users/${userId}/volunteerRanking`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">
          Loading information...
        </div>
      </div>
    );
  }

  if (!volunteer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">
          Volunteer not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Report Volunteer</h1>

          {/* User Information */}
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Reporting User:
            </h3>
            {isUserLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              </div>
            ) : user ? (
              <>
                <p className="font-semibold text-indigo-600">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </>
            ) : (
              <p className="text-sm text-gray-600">
                User not found in database
              </p>
            )}
          </div>
        </div>

        {/* Volunteer Being Reported */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Volunteer Being Reported:
          </h3>
          <div>
            <p className="font-medium">{volunteer.name}</p>
            <p className="text-sm text-gray-600">{volunteer.email}</p>
            <p className="text-xs text-gray-500">Volunteer ID: {volunteerId}</p>
          </div>
        </div>

        {/* Report Form */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Report Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                disabled={isSubmitting}
              >
                <option value="">Select a category</option>
                <option value="unprofessional">Unprofessional Behavior</option>
                <option value="no-show">No Show to SOS</option>
                <option value="inappropriate">Inappropriate Conduct</option>
                <option value="safety">Safety Concerns</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Detailed Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        </div>
        {/* Additional Information */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">
            Important Information
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Please provide accurate and truthful information</li>
            <li>• False reports may result in account suspension</li>
            <li>
              • All reports are reviewed by our admin team within 24 hours
            </li>
            <li>• You may be contacted for additional information</li>
            <li>• Reports are stored in our database for record keeping</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportVolunteer;
