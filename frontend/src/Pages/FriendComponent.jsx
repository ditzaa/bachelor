import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarDash from "../Components/Dashboard/NavbarDash";
import "./FriendComponent.css";

const UserSearchBar = () => {
  const { userId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFriend, setIsFriend] = useState({});

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/user/search?username=${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddFriend = async (friendId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:1234/api/friend/add/${userId}/${friendId}`,
        {},
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.data.message === "Friend added successfully") {
        setIsFriend({
          ...isFriend,
          [friendId]: true,
        });
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      const updatedIsFriend = searchResults.reduce((acc, user) => {
        acc[user.id] = user.isFriend; // Assuming 'isFriend' property exists in search results
        return acc;
      }, {});
      setIsFriend(updatedIsFriend);
    }
  }, [searchResults]);

  return (
    <>
      <NavbarDash />
      <div className="user-search-container">
        <div className="user-search-bar">
          <input
            type="text"
            placeholder="Caută utilizator după numele de utilizator"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Caută</button>
        </div>

        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((user) => (
              <div key={user.id} className="user-result">
                <p>
                  <strong>Nume de utilizator:</strong> {user.username}
                </p>
                <div className="user-details">
                  <p>
                    <strong>Nume:</strong> {user.firstName} {user.lastName}
                  </p>
                  <p>
                    <strong>Rol:</strong> {user.role}
                  </p>
                </div>
                <button
                  className={`add-friend-button ${
                    isFriend[user.id] ? "remove-friend" : ""
                  }`}
                  onClick={() => handleAddFriend(user.id)}
                >
                  {isFriend[user.id] ? "Remove Friend" : "Add Friend"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserSearchBar;
