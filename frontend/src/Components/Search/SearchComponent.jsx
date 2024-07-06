import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchComponent.css";

const SearchComponent = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleInputChange,
  headerText,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <h1 className="search-header">{headerText}</h1>
      <div className="search-bar">
        <button className="back-button" onClick={handleBack}>
          Înapoi
        </button>
        <input
          type="text"
          placeholder={`Introdu ${headerText.toLowerCase()}`}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Caută
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
