import ShowInfoBtn from "../Common Components/ShowInfoBtn";
import { useEffect, useState } from "react";
import { TImeFormate } from "./../../Utilities/timeFormater";
import { useNavigate } from "react-router";
import api from "../../Utilities/axios";

const UserProfile = () => {
  const [notifications, setNotifications] = useState([]);
  const [userReports, setUserReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [singleTitle, setSingleTitle] = useState("");
  const [singleMsg, setSingleMsg] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
  }, []);

  const fetchMsg = async () => {
    try {
      const res = await api.get(`/messages`);
      setNotifications(res.data);
    } catch (error) {
      console.log("error fetching notes");
    }
  };

  const fetchUserReports = async () => {
    try {
      setLoadingReports(true);
      const response = await api.get(`/reports/reporter/${userInfo._id}`);
      setUserReports(response.data.reports || []);
    } catch (error) {
      console.error("Error fetching user reports:", error);
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo._id) {
      // ✅ only run when userInfo is ready
      fetchMsg();
      fetchUserReports();
    }
  }, [userInfo]); // ✅ depends on whole userInfo

  const handleNotificationClick = async (notificationObj, id) => {
    document.getElementById("my_modal_2").showModal();
    setSingleMsg(notificationObj.message);
    setSingleTitle(notificationObj.title);
    const updatedNotification = {
      ...notificationObj,
      seen: [...notificationObj.seen, id],
    };

    try {
      await api.put(`/messages/${notificationObj._id}`, updatedNotification);
    } catch (error) {
      console.log("Error updating volunteer", error);
    }

    setNotifications((prev) =>
      prev.map((n) => (n._id === notificationObj._id ? updatedNotification : n))
    );
  };

  return (
    <div className="flex flex-col gap-12 bg-pink-50 min-h-screen px-4 sm:px-8 md:px-12 lg:px-16 py-4">
      <div className="bg-pink-50 flex items-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {/* Profile Card */}
          <div className="bg-blue-200 rounded-lg p-6 text-center text-black shadow-lg py-12">
            <div className="flex justify-center">
              <img className="w-24" src="../profile.png" alt="" />
            </div>
            <h2 className="mt-4 text-lg font-bold">{userInfo.name}</h2>
            <p className="text-sm text-gray-300">{userInfo.email}</p>
            <button className="mt-4 bg-sky-400 hover:bg-sky-500 px-6 py-2 rounded-full font-semibold">
              {userInfo.type}
            </button>

            <div className="mt-6 space-y-3">
              <button
                onClick={() =>
                  navigate(`/users/${userInfo._id}/volunteerRanking`)
                }
                className="w-full flex items-center justify-center border border-orange-400 bg-orange-50 text-orange-800 rounded-lg py-2 hover:bg-orange-100 font-medium"
              >
                📋 File Incident Report
              </button>
              <ShowInfoBtn userInfo={userInfo}></ShowInfoBtn>
              <button
                onClick={() => navigate(`/users/${userInfo._id}/editProfile`)}
                className="w-full flex items-center justify-center border border-gray-400 bg-white text-gray-700 rounded-lg py-2 hover:bg-gray-100"
              >
                ✏️ Edit Profile
              </button>
            </div>
          </div>

          {/* Emergency Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-8 border-red-500">
            <h2 className="text-lg font-bold text-red-500 mb-4">
              Emergency Actions
            </h2>

            <button
              onClick={() => navigate(`/users/${userInfo._id}/sos`)}
              className="w-full flex items-center justify-center border border-red-500 text-red-500 rounded-2xl py-2 hover:bg-red-50 mt-6"
            >
              ⚠ Send SOS
            </button>
          </div>

          {/* Alert Messages */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-8 border-pink-400">
            <h2 className="text-xl font-bold text-pink-500 mb-4 flex items-center gap-2">
              Alert Messages
              {notifications.filter(
                (notification) => !notification.seen.includes(userInfo._id)
              ).length > 0 && (
                <span className="bg-gray-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {
                    notifications.filter(
                      (notification) =>
                        !notification.seen.includes(userInfo._id)
                    ).length
                  }
                </span>
              )}
            </h2>
            <ul className="space-y-3">
              {notifications.length === 0 ? (
                <li className="text-gray-400">No notifications available.</li>
              ) : (
                notifications.map((notificationMsg, idx) => {
                  const isSeen = notificationMsg.seen.includes(userInfo._id);
                  return (
                    <li key={idx}>
                      <button
                        className={`border text-left px-4 w-full py-3 rounded-lg border-pink-400 ${
                          isSeen ? "font-normal" : "font-bold"
                        } hover:bg-pink-100 hover:text-pink-600 transition-all duration-200`}
                        onClick={() =>
                          handleNotificationClick(notificationMsg, userInfo._id)
                        }
                      >
                        <div>
                          <span>Title: {notificationMsg.title}</span>
                        </div>
                        <div className="text-sm text-right">
                          {TImeFormate(new Date(notificationMsg.createdAt))}
                        </div>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* User Reports Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-t-8 border-purple-500">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-600">
            My Reports ({userReports.length})
          </h2>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => document.getElementById("reports_modal").showModal()}
          >
            View All Reports
          </button>
        </div>

        {loadingReports ? (
          <div className="flex justify-center py-4">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : userReports.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            You haven't submitted any reports yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {userReports.slice(0, 4).map((report) => (
              <div
                key={report._id}
                className="bg-gray-50 p-4 rounded-lg border"
              >
                <h3 className="font-semibold text-sm mb-2">{report.title}</h3>
                <p className="text-xs text-gray-600 mb-2">
                  Against: {report.volunteerName}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`badge badge-sm py-1 px-2  ${
                      report.status === "resolved"
                        ? "badge-success"
                        : report.status === "under_review"
                        ? "badge-warning"
                        : report.status === "dismissed"
                        ? "badge-error"
                        : "badge-info"
                    }`}
                  >
                    {report.status.replace("_", " ")}
                  </span>
                  <span className="text-xs text-gray-500">
                    {TImeFormate(new Date(report.createdAt))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reports Modal */}
      <dialog id="reports_modal" className="modal">
        <div className="modal-box max-w-4xl">
          <h3 className="font-bold text-lg mb-4">All My Reports</h3>

          {userReports.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No reports found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Volunteer</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userReports.map((report) => (
                    <tr key={report._id}>
                      <td>{report.title}</td>
                      <td>
                        <div>
                          <div className="font-medium">
                            {report.volunteerName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {report.volunteerEmail}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm capitalize">
                          {report.category?.replace("-", " ") || "N/A"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            report.status === "resolved"
                              ? "badge-success"
                              : report.status === "under_review"
                              ? "badge-warning"
                              : report.status === "dismissed"
                              ? "badge-error"
                              : "badge-info"
                          }`}
                        >
                          {report.status?.replace("_", " ") || "pending"}
                        </span>
                      </td>
                      <td>{TImeFormate(new Date(report.createdAt))}</td>
                      <td>
                        <button
                          className="btn btn-xs btn-info"
                          onClick={() => {
                            document
                              .getElementById(`report_detail_${report._id}`)
                              .showModal();
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Report Detail Modals */}
      {userReports.map((report) => (
        <dialog
          key={report._id}
          id={`report_detail_${report._id}`}
          className="modal"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Report Details</h3>

            <div className="space-y-3 mt-4">
              <div>
                <strong>Title:</strong> {report.title}
              </div>
              <div>
                <strong>Volunteer Reported:</strong> {report.volunteerName} (
                {report.volunteerEmail})
              </div>
              <div>
                <strong>Category:</strong>{" "}
                <span className="capitalize">
                  {report.category?.replace("-", " ") || "N/A"}
                </span>
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span className="capitalize">
                  {report.status?.replace("_", " ") || "pending"}
                </span>
              </div>
              <div>
                <strong>Submitted:</strong>{" "}
                {new Date(report.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Message:</strong>
                <div className="bg-gray-100 p-3 rounded-lg mt-2">
                  <p className="whitespace-pre-wrap">{report.message}</p>
                </div>
              </div>

              {report.adminNotes && (
                <div>
                  <strong>Admin Notes:</strong>
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mt-2">
                    <p className="whitespace-pre-wrap">{report.adminNotes}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      ))}

      {/* Existing Notification Message Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{singleTitle}</h3>
          <p className="py-4">{singleMsg}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserProfile;
