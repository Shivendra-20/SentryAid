import User from "../model/userModel.js";

export async function getAllUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("error in getAllUsers controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("error in getUserById controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function createUser(req, res) {
  try {
    const {
      name,
      email,
      password, // new required field
      phone,
      address,
      bloodGroup,
      allergies,
      medicalCondition,
      type,
      request,
    } = req.body;

    const user = new User({
      name,
      email,
      password,
      phone,
      address,
      bloodGroup,
      allergies,
      medicalCondition,
      type,
      request: request ?? "pending",
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error in createUser controller", error);
    res.status(500).json({ message: "Internal server errorrr" });
  }
}

export async function updateUser(req, res) {
  try {
    const {
      name,
      email,
      password, // allow password update
      phone,
      address,
      bloodGroup,
      allergies,
      medicalCondition,
      type,
      request,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password,
        phone,
        address,
        bloodGroup,
        allergies,
        medicalCondition,
        type,
        request,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error in deleteUser controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { name, password } = req.body;

    // find user by email
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ success
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in loginUser controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
