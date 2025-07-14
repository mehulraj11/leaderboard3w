import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import axios from "axios";

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [lastClaimedPoints, setLastClaimedPoints] = useState();
  const [claimHistory, setClaimHistory] = useState([]);
  const [isLoading, setClaiming] = useState(false);

  const randomPoints = Math.floor(Math.random() * 10) + 1;
  const getHistory = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/claimhistory`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setClaimHistory(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchUsers = async () => {
    try {
      const user = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getusers`
      );
      // console.log(user.data);

      user.data.sort((a, b) => b.totalPoints - a.totalPoints);

      setUsers(user.data);
      getHistory();
    } catch (error) {
      console.log("Error fetching data", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    getHistory();
  }, []);

  const addUser = async () => {
    if (!newUserName.trim()) {
      alert("Please enter a valid name!");
      return;
    }

    const newUser = {
      name: newUserName.trim(),
      totalPoints: 0,
      rank: users.length + 1,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createuser`,
        { newUser },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchUsers();
      setShowAddUser(false);
      setNewUserName("");
    } catch (error) {
      console.log(error.message);
    }
  };

  // api to updateuser
  const updateUser = async (req, res) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/updateuser`,
        {
          selectedUserId,
          randomPoints,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLastClaimedPoints(randomPoints);
      // console.log("res", res);
    } catch (error) {
      console.log(error.message);
    }
  };

  // api to claim points

  const claimPoints = async () => {
    if (!selectedUserId) {
      alert("Please select a user first!");
      return;
    }

    setClaiming(true);
    const selectedUser = users.find((user) => user._id === selectedUserId);
    // console.log(selectedUser);

    if (selectedUser) {
      await updateUser();
      await getHistory();
      await fetchUsers();
    }
    setClaiming(false);
  };
  // rank color for top 3
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
