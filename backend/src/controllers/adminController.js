import Admin from "../model/adminModel.js";

export async function loginAdmin(req, res) {
  try {
    const { name, password } = req.body;

    // find admin by name
    const admin = await Admin.findOne({ name });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ success
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error in loginAdmin controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createAdmin(req, res) {
  try {
    const { name, password } = req.body;

    const admin = new Admin({ name, password });
    const savedAdmin = await admin.save();

    res.status(201).json(savedAdmin);
  } catch (error) {
    console.error("Error in createAdmin controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
