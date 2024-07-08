import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarDash from "../Components/Dashboard/NavbarDash";
import "./FriendComponent.css";

const FriendComponent = () => {
  const { userId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFriend, setIsFriend] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/user/search?username=${searchTerm}`
      );
      const results = response.data.filter(
        (user) => user.id !== parseInt(userId)
      );

      if (results.length === 0) {
        setErrorMessage("Niciun utilizator găsit.");
        setSearchResults([]);
      } else {
        setErrorMessage("");
        setSearchResults(results);

        // Check friendship status for each result
        results.forEach(async (user) => {
          const friendshipResponse = await axios.get(
            `http://localhost:1234/api/friend/check-friendship/${userId}/${user.id}`
          );
          setIsFriend((prevState) => ({
            ...prevState,
            [user.id]: friendshipResponse.data.isFriend,
          }));
        });
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setErrorMessage("A apărut o eroare la căutarea utilizatorilor.");
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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

  const handleRemoveFriend = async (friendId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:1234/api/friend/remove/${userId}/${friendId}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.data.message === "Friend removed successfully") {
        setIsFriend({
          ...isFriend,
          [friendId]: false,
        });
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <NavbarDash />
      <div className="user-search-container">
        <h3>Adaugă prieteni</h3>
        <div className="search-bar">
          <button className="back-button" onClick={handleBack}>
            Înapoi
          </button>
          <input
            type="text"
            placeholder="Caută utilizator după numele de utilizator"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Caută</button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

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
                  onClick={() =>
                    isFriend[user.id]
                      ? handleRemoveFriend(user.id)
                      : handleAddFriend(user.id)
                  }
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

export default FriendComponent;
