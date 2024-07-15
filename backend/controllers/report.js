const { ReportDb } = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");
const PDFDocument = require("pdfkit");

const controller = {
  saveReport: async (req, res) => {
    try {
      const {
        userId,
        playerName,
        transfermarktId,
        idTheSportsDB,
        generalText,
        statisticsText,
        injuriesText,
        rating,
      } = req.body;

      const payLoad = {
        userId: userId,
        playerName: playerName,
        idTransfermarkt: transfermarktId,
        idTheSportsDB: idTheSportsDB,
        generalText: generalText,
        statisticsText: statisticsText,
        injuriesText: injuriesText,
        rating: rating,
      };

      // Check if there's an existing record with the same userId and idTheSportsDB
      const existingReport = await ReportDb.findOne({
        where: { userId, idTheSportsDB },
      });

      let response;
      if (existingReport) {
        // If record exists, update it
        response = await existingReport.update(payLoad);
        res.status(200).send(response);
      } else {
        // If record does not exist, create a new one
        response = await ReportDb.create(payLoad);
        res.status(201).send(response);
      }
    } catch (error) {
      res.status(500).json({ error: "Error adding favorite player" });
    }
  },
  saveAsPdf: async (req, res) => {
    try {
      const {
        name,
        imageUrl,
        textGeneral,
        textStatistici,
        textInjuries,
        rating,
      } = req.body;
      const doc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${name}.pdf`);

      const stream = res;

      stream.on("finish", () => {
        console.log("PDF generation completed.");
      });

      stream.on("error", (error) => {
        console.error("Error writing PDF to response stream:", error);
        res.status(500).json({ error: "Error generating PDF report" });
      });

      doc.pipe(stream);

      // Titlul raportului
      doc.fontSize(25).text(`Raport pentru ${name}`, { align: "center" });
      doc.moveDown();

      // Adăugarea imaginii jucătorului
      if (imageUrl) {
        try {
          const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
          });
          const imgBuffer = Buffer.from(response.data, "base64");

          // Centrăm imaginea
          const imgWidth = 150; // Lățimea imaginii
          const imgHeight = 150; // Înălțimea imaginii
          const pageWidth = doc.page.width;
          const x = (pageWidth - imgWidth) / 2; // Calculăm poziția x pentru centrare

          doc.image(imgBuffer, x, doc.y, {
            width: imgWidth,
            height: imgHeight,
          });
          doc.moveDown(5); // Adăugăm spațiu după imagine
        } catch (error) {
          console.error("Error loading image:", error);
        }
      }
      doc.moveDown();
      // Restul textului din raport
      doc.fontSize(16).text("Observatii generale", { underline: true });
      doc.fontSize(12).text(textGeneral);
      doc.moveDown();
      doc
        .fontSize(16)
        .text("Observatii indicatori performanta", { underline: true });
      doc.fontSize(12).text(textStatistici);
      doc.moveDown();
      doc
        .fontSize(16)
        .text("Observatii despre accidentari", { underline: true });
      doc.fontSize(12).text(textInjuries);
      doc.moveDown();
      doc.fontSize(16).text("Rating", { underline: true });
      doc.fontSize(12).text(rating);

      doc.end();
    } catch (error) {
      console.error("Error generating PDF report:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error generating PDF report" });
      }
    }
  },
  getAllReports: async (req, res) => {
    const userId = req.params.userId;
    try {
      const reports = await ReportDb.findAll({ where: { userId } });
      res.json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  },
};

module.exports = controller;
