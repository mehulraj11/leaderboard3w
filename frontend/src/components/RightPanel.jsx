import React from "react";
import {Trophy} from "lucide-react"
const RightPanel = ({users, getRankColor, getTrophyIcon, selectedUserId}) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">Live Leaderboard</h2>
        </div>

        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className={`p-4 rounded-lg transition-all duration-300 ${
                parseInt(selectedUserId) === user.id
                  ? "bg-blue-50 border-2 border-blue-300 transform scale-105"
                  : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor(
                      user.rank
                    )}`}
                  >
                    {getTrophyIcon(user.rank)}
                    {user.rank}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {user.name}
                    </h3>
                    <p className="text-gray-600 text-sm">User ID: {user.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {user.totalPoints}
                  </div>
                  <div className="text-sm text-gray-500">points</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
