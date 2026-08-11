import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../Utilities/axios";

const VolunteerRanking = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [reportCounts, setReportCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [volunteerInfo, setVolunteerInfo] = useState([]);
  const [volunteerView, setVolunteerView] = useState(false);

  useEffect(() => {
    const volunteer = localStorage.getItem("volunteer");
    if (volunteer) {
      setVolunteerView(true);
      const user = JSON.parse(localStorage.getItem("volunteer"));
      setVolunteerInfo(user);
    }
  }, []);

  // Fetch volunteer data
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        // const mockVolunteers = await axios.get(
        //   "http://localhost:5001/api/volunteers"     // await api.delete(`/notes/${id}`);
        // );
        const mockVolunteers = await api.get(`/volunteers`);

        const sortedVolunteers = mockVolunteers.data.sort(
          (a, b) => b.score - a.score
        );

        setVolunteers(sortedVolunteers);
        await fetchAllReportCounts(sortedVolunteers);
      } catch (error) {
        console.error("Failed to load volunteers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  // Fetch RESOLVED report counts for all volunteers
  const fetchAllReportCounts = async (volunteersList) => {
    try {
      const counts = {};

      for (const volunteer of volunteersList) {
        try {
          // const response = await axios.get(
          //   `http://localhost:5001/api/reports/volunteer/${volunteer._id}/resolved`
          // );
          const response = await api.get(
            `/reports/volunteer/${volunteer._id}/resolved`
          );
          counts[volunteer._id] = response.data.count;
        } catch (error) {
          console.error(
            `Error fetching reports for volunteer ${volunteer._id}:`,
            error
          );
          counts[volunteer._id] = 0;
        }
      }

      setReportCounts(counts);
    } catch (error) {
      console.error("Error fetching report counts:", error);
    }
  };

  // REAL-TIME: Set up polling to refresh report counts every 3 seconds
  useEffect(() => {
    if (volunteers.length === 0) return;

    const interval = setInterval(() => {
      fetchAllReportCounts(volunteers);
    }, 3000); // Refresh every 3 seconds

    return () => clearInterval(interval);
  }, [volunteers]); // Re-run when volunteers change

  const handleReport = (volunteerId) => {
    navigate(`/reportVolunteer/${volunteerId}`);
  };

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `#${index + 1}`;
    }
  };

  const getAvatarPlaceholder = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return (
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg">
        {initials}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">
          Loading leaderboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Volunteer Leaderboard
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Top volunteers based on SOS responses
          </p>
          {!volunteerView && (
            <p className="mt-4 text-sm text-orange-800 bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 max-w-2xl mx-auto">
              <strong>Incident report:</strong> tap red <strong>Report</strong> on
              any volunteer to file a safety complaint. Admin reviews it under{" "}
              <strong>Reports</strong> in the admin panel.
            </p>
          )}
        </div>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="bg-indigo-700 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Top Responders</h2>
          </div>

          <ul className="divide-y divide-gray-200">
            {volunteers.map((volunteer, index) => {
              const resolvedReports = reportCounts[volunteer._id] || 0;

              return (
                <li
                  key={volunteer._id}
                  className={`p-6 ${
                    volunteer._id === volunteerInfo._id ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="flex-shrink-0 sm:w-10 w-8 sm:h-10 h-8 flex items-center justify-center border border-indigo-800 rounded-full bg-indigo-100 text-indigo-800 font-bold text-lg">
                        {getRankBadge(index)}
                      </div>

                      <div className="hidden sm:flex">
                        {getAvatarPlaceholder(volunteer.name)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="sm:text-lg font-medium text-gray-900">
                          {volunteer.name}
                        </p>
                        <p className="text-sm text-gray-500 hidden sm:flex">
                          {volunteer.email}
                        </p>

                        {/* SHOW ONLY RESOLVED REPORTS */}
                        {resolvedReports > 0 && (
                          <p className="text-xs text-red-600 font-semibold mt-1">
                            ⚠️ {resolvedReports} report
                            {resolvedReports !== 1 ? "s" : ""} found
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex items-center sm:px-3 px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                        SOS:{" "}
                        <span className="font-bold ml-1">
                          {volunteer.score}
                        </span>
                      </div>
                      {!volunteerView && (
                        <button
                          onClick={() => handleReport(volunteer._id)}
                          className="inline-flex items-center sm:px-3 px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          Report
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRanking;
