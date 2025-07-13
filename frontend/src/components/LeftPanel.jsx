import React from "react";
import { Users, TrendingUp } from "lucide-react";
import AddUser from "./AddUser";
const LeftPanel = ({
  selectedUserId,
  setSelectedUserId,
  users,
  claimPoints,
  isLoading,
  lastClaimedPoints,
  showAddUser,
  setShowAddUser,
  newUserName,
  setNewUserName,
  addUser,
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* User Selection Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Select User</h2>
        </div>

        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-4"
        >
          <option value="">Choose a user...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} (Rank #{user.rank} - {user.totalPoints} pts)
            </option>
          ))}
        </select>

        <button
          onClick={claimPoints}
          disabled={!selectedUserId || isLoading}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
            !selectedUserId || isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:scale-105"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Claiming...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Claim Points
            </div>
          )}
        </button>

        {lastClaimedPoints && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold text-center">
              🎉 +{lastClaimedPoints} points claimed!
            </p>
          </div>
        )}
      </div>

      {/* Add New User Card */}
      <AddUser
        showAddUser={showAddUser}
        setShowAddUser={setShowAddUser}
        newUserName={newUserName}
        setNewUserName={setNewUserName}
        addUser={addUser}
      />
    </div>
  );
};

export default LeftPanel;
