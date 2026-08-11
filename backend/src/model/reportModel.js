import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    // Reporter information
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reporterName: {
      type: String,
      required: true
    },
    reporterEmail: {
      type: String,
      required: true
    },
    
    // Volunteer being reported
    volunteerId: {
      type: String,
      required: true
    },
    volunteerName: {
      type: String,
      required: true
    },
    volunteerEmail: {
      type: String,
      required: true
    },
    
    // Report details
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['unprofessional', 'no-show', 'inappropriate', 'safety', 'other']
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    
    // Report status
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'under_review', 'resolved', 'dismissed']
    },
    
    // Admin notes
    adminNotes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;