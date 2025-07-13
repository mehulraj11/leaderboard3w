import React from "react";
import { Plus } from "lucide-react";
const AddUser = ({
  showAddUser,
  setShowAddUser,
  newUserName,
  setNewUserName,
  addUser,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Plus className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
      </div>

      {!showAddUser ? (
        <button
          onClick={() => setShowAddUser(true)}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="w-5 h-5 inline-block mr-2" />
          Add User
        </button>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter user name..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            onKeyPress={(e) => e.key === "Enter" && addUser()}
          />
          <div className="flex gap-2">
            <button
              onClick={addUser}
              className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddUser(false);
                setNewUserName("");
              }}
              className="flex-1 py-2 px-4 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
