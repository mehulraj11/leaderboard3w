import { useState, useEffect } from "react";
import { Trophy, Award } from "lucide-react";
import RightPanel from "./RightPanel";
import axios from "axios";

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  // API CALL TO FETCH USERS LIST
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getusers`
        );
        console.log(user.data);

        setUsers(user.data);
      } catch (error) {
        console.log("Error fetching data", error.message);
      }
    };
    fetchUsers();
  }, []);
  // Get rank styling
  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-600 to-amber-800 text-white";
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
    }
  };

  // Get trophy icon for top 3
  const getTrophyIcon = (rank) => {
    if (rank <= 3) {
      return <Trophy className="w-5 h-5 inline-block mr-1" />;
    }
    return <Award className="w-5 h-5 inline-block mr-1" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Leaderboard System
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Select a user and claim random points to climb the rankings!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RightPanel
            users={users}
            getRankColor={getRankColor}
            getTrophyIcon={getTrophyIcon}
            selectedUserId={selectedUserId}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
