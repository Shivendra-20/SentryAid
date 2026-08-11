import AdminRequestRow from "./AdminRequestRow";

const statusBadge = (request) => {
  const styles = {
    pending: "bg-amber-100 text-amber-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs capitalize ${
        styles[request] || "bg-gray-100 text-gray-800"
      }`}
    >
      {request || "unknown"}
    </span>
  );
};

const NewVolunteerReq = ({ users, setUsers }) => {
  const pending = users.filter((user) => user.request === "pending");
  const others = users.filter((user) => user.request !== "pending");

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        <strong>{pending.length}</strong> pending ·{" "}
        <strong>{users.length}</strong> total registrations
      </p>

      <div className="mt-6 shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white">
            <tr>
              <th className="py-4 px-4 text-sm font-semibold text-gray-600 text-center">
                Name
              </th>
              <th className="hidden lg:table-cell py-4 px-4 text-sm font-semibold text-gray-600 text-center">
                Email
              </th>
              <th className="py-4 px-4 text-sm font-semibold text-gray-600 text-center">
                Status
              </th>
              <th className="py-4 px-4 text-sm font-semibold text-gray-600 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-8">
                  No registrations yet. Sign up as user or volunteer first.
                </td>
              </tr>
            ) : (
              <>
                {pending.map((user) => (
                  <AdminRequestRow key={user._id} user={user} setUsers={setUsers} />
                ))}
                {others.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b text-center align-middle bg-gray-50"
                  >
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {user.name}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 hidden md:table-cell">
                      {user.email ?? "--"}
                    </td>
                    <td className="py-4 px-4">{statusBadge(user.request)}</td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {user.request === "accepted"
                        ? "Already approved"
                        : "Rejected"}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {pending.length === 0 && users.length > 0 && (
        <p className="mt-4 text-center text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
          No pending requests. Create a <strong>new signup</strong> to demo
          Approve — existing accounts are already accepted.
        </p>
      )}
    </div>
  );
};

export default NewVolunteerReq;
