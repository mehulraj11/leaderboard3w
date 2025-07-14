import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import axios from "axios";

const LeaderBoard = ({
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
  claimHistory,
  getRankColor,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
            <h1 className="text-4xl font-bold">Leaderboard System</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Select a user and claim random points to climb the rankings!
          </p>
        </div>

        {/* panels */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LeftPanel
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            users={users}
            claimPoints={claimPoints}
            isLoading={isLoading}
            lastClaimedPoints={lastClaimedPoints}
            showAddUser={showAddUser}
            setShowAddUser={setShowAddUser}
            newUserName={newUserName}
            setNewUserName={setNewUserName}
            addUser={addUser}
            claimHistory={claimHistory}
          />
          <RightPanel
            users={users}
            getRankColor={getRankColor}
            selectedUserId={selectedUserId}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
