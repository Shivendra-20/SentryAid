import ShowInfoBtn from "../Common Components/ShowInfoBtn";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import api from "../../Utilities/axios";

const VolunteerProfile = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeNotif, setActiveNotif] = useState(null);
  const [sta, setSta] = useState("");
  const [volunteerInfo, setVolunteerInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("volunteer"));
    setVolunteerInfo(user);
  }, []);

  useEffect(() => {
    if (volunteerInfo) {
      setSta(volunteerInfo.status);
    }
  }, [volunteerInfo]);

  // Fetch messages and check read status
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await api.get(`/messages`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to load alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  const handleNotifClick = async (notif) => {
    if (volunteerInfo && volunteerInfo._id) {
      try {
        // Mark message as read by this volunteer
        await api.patch(
          `/messages/${notif._id}/read-by-volunteer/${volunteerInfo._id}`
        );

        // Update local state to reflect read status
        setNotifications((prev) =>
          prev.map((msg) =>
            msg._id === notif._id
              ? {
                  ...msg,
                  seenByVolunteers: [
                    ...msg.seenByVolunteers,
                    volunteerInfo._id,
                  ],
                }
              : msg
          )
        );
      } catch (error) {
        console.error("Failed to mark message as read:", error);
      }
    }

    setActiveNotif(notif);
    document.getElementById("notification_modal").showModal();
  };

  const makeActiveInactive = async () => {
    const newStatus = sta === "active" ? "inactive" : "active";
    setSta(newStatus);

    const volunteerUpdate = { ...volunteerInfo, status: newStatus };

    localStorage.setItem("volunteer", JSON.stringify(volunteerUpdate));

    try {
      const res = await api.put(
        `/volunteers/${volunteerInfo._id}`,
        volunteerUpdate
      );
      console.log("Updated Volunteer:", res.data);
    } catch (error) {
      console.log("Error updating volunteer", error);
    }
  };

  // Check if current volunteer has read a message
  const hasVolunteerReadMessage = (message) => {
    return volunteerInfo && volunteerInfo._id && message.seenByVolunteers
      ? message.seenByVolunteers.includes(volunteerInfo._id)
      : false;
  };

  // Count unread messages for this volunteer
  const unreadCount = notifications.filter(
    (notif) => !hasVolunteerReadMessage(notif)
  ).length;

  return (
    <div className="flex flex-col gap-12 bg-pink-50 min-h-screen sm:p-16 p-8 ">
      <div className="bg-pink-50 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {/* Profile Card */}
          <div className="bg-blue-200 rounded-lg p-6 text-center text-black shadow-lg py-12">
            <div className="flex justify-center">
              <img className="w-24" src="../profile.png" alt="" />
            </div>
            <h2 className="mt-4 text-lg font-bold">{volunteerInfo.name}</h2>
            <p className="text-sm text-black">{volunteerInfo.email}</p>
            <button className="mt-4 bg-sky-400 hover:bg-sky-500 px-6 py-2 rounded-full font-semibold">
              {volunteerInfo.type}
            </button>

            <div className="mt-6 space-y-3">
              <ShowInfoBtn userInfo={volunteerInfo}></ShowInfoBtn>
              <button
                onClick={() =>
                  navigate(`/volunteers/${volunteerInfo._id}/editProfile`)
                }
                className="w-full flex items-center justify-center border border-gray-400 bg-white text-gray-700 rounded-lg py-2 hover:bg-gray-100"
              >
                ✏️ Edit Profile
              </button>
              {sta == "active" ? (
                <button
                  onClick={makeActiveInactive}
                  className="w-full flex items-center justify-center border border-gray-400 bg-green-200 text-gray-700 rounded-lg py-2 hover:bg-gray-100"
                >
                  📞 Active
                </button>
              ) : (
                <button
                  onClick={makeActiveInactive}
                  className="w-full flex items-center justify-center border border-gray-400 bg-red-200 text-gray-700 rounded-lg py-2 hover:bg-gray-100"
                >
                  📞 Inactive
                </button>
              )}
            </div>
          </div>

          {/* Alert Messages - UPDATED */}
          <div className="bg-white  rounded-lg shadow-lg p-6 border-t-8 border-pink-400">
            <h2 className="text-xl font-bold text-pink-500 mb-8 flex items-center gap-2">
              Alert Messages
              {unreadCount > 0 && (
                <span className="bg-gray-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </h2>
            <ul className="space-y-3 ">
              {notifications.length === 0 ? (
                <li className="text-gray-400">No notifications available.</li>
              ) : (
                notifications.map((notif) => {
                  const isRead = hasVolunteerReadMessage(notif);
                  return (
                    <li key={notif._id}>
                      <button
                        className={`border flex items-center px-4 w-full py-3 rounded-lg border-pink-400 ${
                          isRead ? "font-normal" : "font-bold"
                        } hover:bg-pink-100 hover:text-pink-600 transition-all duration-200 text-black`}
                        onClick={() => handleNotifClick(notif)}
                      >
                        <div className="text-left">
                          <span>Title: {notif.title}</span>
                        </div>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          {/* SOS Alert Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-8 border-red-500">
            <h2 className="text-xl font-bold text-red-500 mb-4">SOS Alert</h2>
            <button
              onClick={() =>
                navigate(`/volunteers/${volunteerInfo._id}/sosAlert`)
              }
              className="w-full flex items-center justify-center border border-red-500 text-red-500 rounded-2xl py-2 hover:bg-red-50 mt-6"
            >
              ⚠ Get SOS Alert
            </button>
          </div>
        </div>
      </div>

      {/* Notification Message Modal */}
      <dialog id="notification_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-pink-600">
            {activeNotif?.title}
          </h3>
          <p className="py-4 text-pink-400">{activeNotif?.message}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default VolunteerProfile;
