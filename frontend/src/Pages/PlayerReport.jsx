import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./PlayerReport.css";

const PlayerReport = ({ player }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSaveReport = async () => {
    try {
      await axios.post("http://localhost:1234/api/save-report", {
        playerId: player.idPlayer,
        content,
      });
      alert("Raportul a fost salvat cu succes în baza de date.");
    } catch (error) {
      console.error("Error saving report:", error);
      alert("A apărut o eroare la salvarea raportului.");
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Nume: ${player.strPlayer}`, 10, 10);
    doc.text(`Echipă: ${player.strTeam}`, 10, 20);
    doc.text(`Poziție: ${player.strPosition}`, 10, 30);
    doc.addImage(player.strCutout || player.strThumb, "JPEG", 10, 40, 50, 50);
    doc.text(`Raport: ${content}`, 10, 100);
    doc.save(`${player.strPlayer}-report.pdf`);
  };

  return (
    <div className="report-container">
      <h2>Raport pentru {player.strPlayer}</h2>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Scrie aici despre jucător..."
      />
      <div className="report-buttons">
        <button onClick={handleSaveReport} className="save-button">
          Salvează Raportul
        </button>
        <button onClick={handleExportPDF} className="pdf-button">
          Exportă ca PDF
        </button>
      </div>
    </div>
  );
};

export default PlayerReport;
