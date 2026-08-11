import BulletinMsg from "../model/BulletinMsgModel.js";

// Fetch all bulletin messages (latest first)
export async function getAllBulletinMsgs(req, res) {
  try {
    const messages = await BulletinMsg.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getAllBulletinMsgs controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new bulletin message
export async function createBulletinMsg(req, res) {
  try {
    const { name, type, title, msg } = req.body;

    // Validate required fields
    if (!name || !type || !title || !msg) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMsg = new BulletinMsg({
      name,
      type,
      title,
      msg,
    });

    const savedMsg = await newMsg.save();
    res.status(201).json(savedMsg);
  } catch (error) {
    console.error("Error in createBulletinMsg controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
