import React, { useState, useEffect } from "react";
import LeaderBoard from "./components/LeaderBoard";
import axios from "axios";
const App = () => {
  // states

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [lastClaimedPoints, setLastClaimedPoints] = useState();
  const [claimHistory, setClaimHistory] = useState([]);
  const [isLoading, setClaiming] = useState(false);

  const randomPoints = Math.floor(Math.random() * 10) + 1;

  // handler functions

  // api call to get claim history

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

  // api call to get all users

  const fetchUsers = async () => {
    try {
      const user = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getusers`
      );
      // console.log(user.data);

      user.data.sort((a, b) => b.totalPoints - a.totalPoints);

      setUsers(user.data);
      await getHistory();
    } catch (error) {
      console.log("Error fetching data", error.message);
    }
  };

  // useeffect to render users and history on first render

  useEffect(() => {
    fetchUsers();
    getHistory();
  }, []);

  // api call to add user / create user

  const addUser = async () => {
    if (!newUserName.trim()) {
      alert("Please enter a valid name!");
      return;
    }

    const newUser = {
      name: newUserName.trim().charAt(0).toUpperCase() + newUserName.slice(1),
      totalPoints: 0,
      rank: users.length + 1,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createuser`,
        { newUser },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await fetchUsers();
      setShowAddUser(false);
      setNewUserName("");
    } catch (error) {
      console.log(error.message);
    }
  };

  // api to updateuser

  const updateUser = async () => {
    try {
      await axios.put(
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
    <div>
      <LeaderBoard
        // states

        users={users}
        setUsers={setUsers}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        newUserName={newUserName}
        setNewUserName={setNewUserName}
        showAddUser={showAddUser}
        setShowAddUser={setShowAddUser}
        lastClaimedPoints={lastClaimedPoints}
        setLastClaimedPoints={setLastClaimedPoints}
        claimHistory={claimHistory}
        setClaimHistory={setClaimHistory}
        isLoading={isLoading}
        setClaiming={setClaiming}
        // api handler functions

        getHistory={getHistory}
        fetchUsers={fetchUsers}
        addUser={addUser}
        updateUser={updateUser}
        claimPoints={claimPoints}
        getRankColor={getRankColor}
      />
    </div>
  );
};

export default App;
