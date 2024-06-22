import React, { useState, useEffect } from "react";
import "./FriendComponent.css";
import NavbarDash from "../Components/Dashboard/NavbarDash";
import axios from "axios";

const UserSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFriend, setIsFriend] = useState({}); // Track friendship status

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/user/search?username=${searchTerm}`
      );
      const users = response.data;
      // Update friendship status based on your backend logic (replace with actual logic)
      const updatedUsers = users.map((user) => ({
        ...user,
        isFriend: user.id % 2 === 0, // Simulate friend status for demo (replace)
      }));
      setSearchResults(updatedUsers);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddFriend = async (user) => {
    try {
      // Send an API request to add/remove friend based on user.isFriend
      // Update the 'isFriend' state for the corresponding user
      setIsFriend({
        ...isFriend,
        [user.id]: !user.isFriend, // Toggle friendship status for demo (replace)
      });
    } catch (error) {
      console.error("Error adding/removing friend:", error);
    }
  };

  // Update friend status in state on search results change (optional)
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
      <NavbarDash></NavbarDash>
      <div className="user-search-container">
        <div className="user-search-bar">
          <input
            type="text"
            placeholder="Search users by username"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Display search results here */}
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((user) => (
              <div key={user.id} className="user-result">
                <p>Username: {user.username}</p>
                <div className="user-details">
                  <p>
                    Name: {user.firstName} {user.lastName}
                  </p>
                  <p>Role: {user.role}</p>
                </div>
                <button
                  className={`add-friend-button ${
                    user.isFriend ? "remove-friend" : ""
                  }`}
                  onClick={() => handleAddFriend(user)}
                >
                  {user.isFriend ? "Remove Friend" : "Add Friend"}
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
