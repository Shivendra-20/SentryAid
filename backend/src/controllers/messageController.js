import Message from "../model/messageModel.js";

export async function getAllMessage(req, res) {
  try {
    const users = await Message.find().sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("error in getAllMessage controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function createMessage(req, res) {
  try {
    const { title, message, seen } = req.body;

    // Create a new message based on the schema
    const newMessage = new Message({
      title,
      message,
      seen: seen || [], // default empty if not provided
    });

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error in createMessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateMessage(req, res) {
  try {
    const { title, message, seen } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id, // MongoDB _id
      {
        title,
        message,
        seen,
      },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error("Error in updateMessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function markAsReadByVolunteer(req, res) {
  try {
    const { messageId, volunteerId } = req.params;

    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Check if volunteer already marked this as read
    if (!message.seenByVolunteers.includes(volunteerId)) {
      message.seenByVolunteers.push(volunteerId);
      await message.save();
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("Error in markAsReadByVolunteer controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteMessage(req, res) {
  try {
    const deleteUser = await Message.findByIdAndDelete(req.params.id);

    if (!deleteUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("error in deleteMessage controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}
