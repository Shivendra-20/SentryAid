import React from "react";
import { NavLink } from "react-router";

const ShowInfoBtn = ({ userInfo }) => {
  const {
    _id,
    name,
    email,
    phone,
    address,
    bloodGroup,
    allergies,
    medicalCondition,
    type,
  } = userInfo;
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="w-full flex items-center justify-center border border-gray-400 bg-white text-gray-700 rounded-lg py-2 hover:bg-gray-100"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        👤 Profile
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="flex justify-center items-center  ">
            <div className="bg-white p-6  w-full max-w-md text-gray-800">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <img
                  className="w-26 "
                  src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
                  alt=""
                />
                <h2 className="text-xl font-bold mt-4">{name}</h2>
                <p className="text-gray-600">{type}</p>
              </div>

              {/* User Details */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span>{email || "—"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-700">Phone:</span>
                  <span>{phone || "—"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-700">Address:</span>
                  <span>{address || "—"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-700">
                    Blood Group:
                  </span>
                  <span>{bloodGroup || "—"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-700">
                    Allergies:
                  </span>
                  <span>{allergies || "—"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-700">
                    Medical Condition:
                  </span>
                  <span>{medicalCondition || "—"}</span>
                </div>
              </div>

              {/* Edit Button */}
              <div className="mt-12 flex justify-between items-center">
                <div>
                  <NavLink
                    to={`/${type}s/${_id}/editProfile`}
                    className="btn bg-pink-400 text-white"
                  >
                    Edit Profile
                  </NavLink>
                </div>
                <div>
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn bg-pink-400 text-white">
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ShowInfoBtn;
