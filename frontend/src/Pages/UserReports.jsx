import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarDash from "../Components/Dashboard/NavbarDash";
import "./UserReports.css";
import { Navigate, useNavigate } from "react-router-dom";

const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  let userId = localStorage.getItem("userID");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1234/api/report/getAllReports/${userId}`
        );
        setReports(response.data);
      } catch (error) {
        setError("A apărut o eroare la preluarea rapoartelor.");
      }
    };

    fetchReports();
  }, [userId]);

  return (
    <>
      <NavbarDash />
      <div className="user-reports-container">
        <h3>Rapoartele mele</h3>
        <button
          className="back-button"
          id="bck-btn-rep"
          onClick={() => navigate(-1)}
        >
          Înapoi
        </button>

        {error && <div className="error-message">{error}</div>}
        <div className="reports-list">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <h4>{report.playerName}</h4>
              <p>
                <strong>Text General:</strong> {report.generalText}
              </p>
              <p>
                <strong>Statistici:</strong> {report.statisticsText}
              </p>
              <p>
                <strong>Accidentări:</strong> {report.injuriesText}
              </p>
              <p>
                <strong>Rating:</strong> {report.rating}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserReports;
