import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TImeFormate } from "../../Utilities/timeFormater";
import api from "../../Utilities/axios";

const ReportsTable = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readReports, setReadReports] = useState(new Set());

  const fetchReports = async () => {
    try {
      const response = await api.get(`/reports`);
      setReports(response.data.reports || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleReportClick = (reportId) => {
    setReadReports((prev) => new Set([...prev, reportId]));
  };

  const updateReportStatus = async (reportId, newStatus, adminNotes = "") => {
    try {
      const response = await api.put(
        `/reports/${reportId}`,
        {
          status: newStatus,
          adminNotes,
        }
      );

      if (response.data.success) {
        fetchReports();
        toast.success(`Report marked as ${newStatus.replace("_", " ")}`);
      }
    } catch (error) {
      console.error("Error updating report status:", error);
      toast.error("Failed to update report status");
    }
  };

  const formatCategory = (category) => {
    if (!category) return "Unknown";
    return category.replace("-", " ").replace("_", " ");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <ToastContainer />
      <h2 className="text-xl font-bold text-gray-800 mb-6">User Reports</h2>

      {reports.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No reports found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 hidden md:table-cell">
                  Reporter
                </th>
                <th className="py-3 px-4  text-sm font-semibold text-gray-700 hidden md:table-cell text-center">
                  Reported
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                  Title
                </th>

                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 hidden md:table-cell">
                  Status
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 hidden md:table-cell">
                  Time
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 flex justify-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                const isRead = readReports.has(report._id);
                const statusColor =
                  {
                    pending: "bg-yellow-100 text-yellow-800",
                    under_review: "bg-blue-100 text-blue-800",
                    resolved: "bg-green-100 text-green-800",
                    dismissed: "bg-red-100 text-red-800",
                  }[report.status] || "bg-gray-100 text-gray-800";

                return (
                  <tr
                    key={report._id}
                    className={`border-b hover:bg-gray-50 ${
                      isRead ? "" : "bg-gray-50"
                    }`}
                  >
                    {/* Reporter Info */}
                    <td className="py-4 px-4 text-sm hidden md:table-cell text-center">
                      <div>
                        <p
                          className={
                            isRead
                              ? "text-gray-800"
                              : "font-semibold text-gray-900"
                          }
                        >
                          {report.reporterName || "Unknown"}
                        </p>
                      </div>
                    </td>

                    {/* Volunteer Reported */}
                    <td className="py-4 px-4 text-sm hidden md:table-cell text-center">
                      <div>
                        <p
                          className={
                            isRead
                              ? "text-gray-800"
                              : "font-semibold text-gray-900"
                          }
                        >
                          {report.volunteerName || "Unknown"}
                        </p>
                      </div>
                    </td>

                    {/* Report Details */}
                    <td className="py-3 px-4 text-sm text-center">
                      <span
                        className={
                          isRead
                            ? "text-gray-800"
                            : "font-semibold text-gray-900"
                        }
                      >
                        {report.title || "No title"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-sm hidden md:table-cell text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs capitalize ${statusColor}`}
                      >
                        {(report.status || "pending").replace("_", " ")}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="py-3 px-4 text-sm text-gray-600 hidden md:table-cell text-center">
                      <span className={isRead ? "" : "font-semibold"}>
                        {report.createdAt
                          ? TImeFormate(new Date(report.createdAt))
                          : "Unknown time"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-sm">
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={() => {
                            document
                              .getElementById(`modal-${report._id}`)
                              .showModal();
                            handleReportClick(report._id);
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                        >
                          View
                        </button>

                        {(report.status === "pending" || !report.status) && (
                          <button
                            onClick={() =>
                              updateReportStatus(report._id, "under_review")
                            }
                            className="px-3 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600 hidden md:inline-block"
                          >
                            Review
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals for each report */}
      {reports.map((report) => (
        <dialog key={report._id} id={`modal-${report._id}`} className="modal">
          <div className="modal-box max-w-4xl text-black md:p-12 p-4">
            <h3 className="font-bold text-lg mb-4 text-black">
              Report Details
            </h3>

            <div className="flex flex-col md:flex-row justify-between mb-6 gap-8">
              <div>
                <h4 className="font-semibold text-gray-700">
                  Reporter Information
                </h4>
                <p>
                  <strong>Name:</strong> {report.reporterName || "Unknown"}
                </p>
                <p>
                  <strong>Email:</strong> {report.reporterEmail || "No email"}
                </p>
                <p>
                  <strong>ID:</strong> {report.reporterId || "N/A"}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">
                  Volunteer Reported
                </h4>
                <p>
                  <strong>Name:</strong> {report.volunteerName || "Unknown"}
                </p>
                <p>
                  <strong>Email:</strong> {report.volunteerEmail || "No email"}
                </p>
                <p>
                  <strong>ID:</strong> {report.volunteerId || "N/A"}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-700">Report Details</h4>
              <p>
                <strong>Title:</strong> {report.title || "No title"}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                <span className="capitalize">
                  {formatCategory(report.category)}
                </span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">
                  {(report.status || "pending").replace("_", " ")}
                </span>
              </p>
              <p>
                <strong>Submitted:</strong>{" "}
                {report.createdAt
                  ? new Date(report.createdAt).toLocaleString()
                  : "Unknown time"}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-700">Message</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">
                  {report.message || "No message provided"}
                </p>
              </div>
            </div>

            {report.adminNotes && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700">Admin Notes</h4>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="whitespace-pre-wrap">{report.adminNotes}</p>
                </div>
              </div>
            )}

            <div className="modal-action">
              <form method="dialog">
                <button className=" bg-pink-300 btn btn-ghost">Close</button>
              </form>
              <div className="flex space-x-2">
                <div className="flex flex-col md:flex-row md:gap-2 gap-4">
                  <button
                    onClick={() =>
                      updateReportStatus(
                        report._id,
                        "resolved",
                        "Issue resolved"
                      )
                    }
                    className="btn btn-success"
                  >
                    Mark Resolved
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        // 1️⃣ Check if volunteer exists
                        const res = await api.get(
                          `/volunteers/${report.volunteerId}`
                        );

                        if (res.data) {
                          // 2️⃣ Volunteer exists → delete
                          await api.delete(
                            `/volunteers/${report.volunteerId}`
                          );
                          toast.success("✅ Volunteer banned successfully");
                        }
                      } catch (error) {
                        if (error.response && error.response.status === 404) {
                          toast.info("ℹ️ This person is already banned");
                        } else {
                          toast.error(
                            "❌ Something went wrong while banning volunteer"
                          );
                        }
                      }
                    }}
                    className="btn btn-error whitespace-nowrap"
                  >
                    Block Volunteer
                  </button>
                </div>

                <button
                  onClick={() =>
                    updateReportStatus(
                      report._id,
                      "dismissed",
                      "Report dismissed"
                    )
                  }
                  className="btn bg-red-200 border border-red-300"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
};

export default ReportsTable;
