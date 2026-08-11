import Notification from "../model/notificationModel.js";

// Create a new notification
export async function createNotification(req, res) {
  try {
    const { userId, title, message, type, relatedReportId } = req.body;

    const newNotification = new Notification({
      userId,
      title,
      message,
      type,
      relatedReportId
    });

    const savedNotification = await newNotification.save();

    res.status(201).json({
      success: true,
      notification: savedNotification
    });

  } catch (error) {
    console.error("Error in createNotification controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Get notifications for a user
export async function getUserNotifications(req, res) {
  try {
    const { userId } = req.params;
    
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    console.error("Error in getUserNotifications controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Mark notification as read
export async function markAsRead(req, res) {
  try {
    const { id } = req.params;
    
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    res.status(200).json({
      success: true,
      notification: updatedNotification
    });
  } catch (error) {
    console.error("Error in markAsRead controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Mark all notifications as read
export async function markAllAsRead(req, res) {
  try {
    const { userId } = req.params;
    
    await Notification.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read"
    });
  } catch (error) {
    console.error("Error in markAllAsRead controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}