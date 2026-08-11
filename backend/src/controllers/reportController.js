import Report from "../model/reportModel.js";

// Create a new report
export async function createReport(req, res) {
  try {
    const {
      reporterId,
      reporterName,
      reporterEmail,
      volunteerId,
      volunteerName,
      volunteerEmail,
      title,
      category,
      message
    } = req.body;

    // Create new report
    const newReport = new Report({
      reporterId,
      reporterName,
      reporterEmail,
      volunteerId,
      volunteerName,
      volunteerEmail,
      title,
      category,
      message
    });

    const savedReport = await newReport.save();

    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report: savedReport
    });

  } catch (error) {
    console.error("Error in createReport controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Get all reports
export async function getAllReports(req, res) {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      reports
    });
  } catch (error) {
    console.error("Error in getAllReports controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Get reports by reporter ID
export async function getReportsByReporter(req, res) {
  try {
    const { reporterId } = req.params;
    
    const reports = await Report.find({ reporterId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      reports
    });
  } catch (error) {
    console.error("Error in getReportsByReporter controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Get reports by volunteer ID
export async function getReportsByVolunteer(req, res) {
  try {
    const { volunteerId } = req.params;
    
    const reports = await Report.find({ volunteerId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      reports
    });
  } catch (error) {
    console.error("Error in getReportsByVolunteer controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Get single report by ID
export async function getReportById(req, res) {
  try {
    const { id } = req.params;
    
    const report = await Report.findById(id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }
    
    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    console.error("Error in getReportById controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Update report status (for admin)
export async function updateReportStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { 
        status,
        ...(adminNotes && { adminNotes }) // Only update adminNotes if provided
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Report status updated successfully",
      report: updatedReport
    });
  } catch (error) {
    console.error("Error in updateReportStatus controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Delete report (for admin)
export async function deleteReport(req, res) {
  try {
    const { id } = req.params;
    
    const deletedReport = await Report.findByIdAndDelete(id);
    
    if (!deletedReport) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Report deleted successfully"
    });
  } catch (error) {
    console.error("Error in deleteReport controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

//for report count
// Get RESOLVED reports count for a volunteer
export async function getResolvedReportsCountByVolunteer(req, res) {
  try {
    const { volunteerId } = req.params;
    
    // Count ONLY resolved reports
    const resolvedReportsCount = await Report.countDocuments({
      volunteerId: volunteerId,
      status: 'resolved' // ONLY count resolved reports
    });
    
    res.status(200).json({
      success: true,
      count: resolvedReportsCount
    });
  } catch (error) {
    console.error("Error in getResolvedReportsCountByVolunteer controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
