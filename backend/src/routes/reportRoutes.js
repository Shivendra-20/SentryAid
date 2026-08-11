import express from "express";
import { getResolvedReportsCountByVolunteer } from "../controllers/reportController.js";

import {
  createReport,
  getAllReports,
  getReportsByReporter,
  getReportsByVolunteer,
  getReportById,
  updateReportStatus,
  deleteReport
} from "../controllers/reportController.js";

const router = express.Router();

// Create a new report
router.post("/", createReport);

// Get all reports (for admin)
router.get("/", getAllReports);

// Get reports by reporter ID
router.get("/reporter/:reporterId", getReportsByReporter);

// Get reports by volunteer ID
router.get("/volunteer/:volunteerId", getReportsByVolunteer);

// Get single report by ID
router.get("/:id", getReportById);

// Update report status (for admin)
router.put("/:id", updateReportStatus);

// Delete report (for admin)
router.delete("/:id", deleteReport);

// Get count of resolved reports for a volunteer
router.get("/volunteer/:volunteerId/resolved", getResolvedReportsCountByVolunteer);

export default router;