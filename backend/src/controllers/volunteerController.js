import Volunteer from "./../model/volunteerModel.js";

export async function getAllUsers(req, res) {
  try {
    const users = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("error in getAllUsers controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await Volunteer.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("error in getUserById controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function loginVolunteer(req, res) {
  try {
    const { name, password } = req.body;

    // find user by email
    const user = await Volunteer.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check password (plain-text for now, bcrypt recommended)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ success
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in loginVolunteer controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createUser(req, res) {
  try {
    const {
      name,
      email,
      password, // new password field
      phone,
      address,
      bloodGroup,
      allergies,
      medicalCondition,
      type,
      request,
      status,
      score,
    } = req.body;

    const user = new Volunteer({
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
      status: status || "active",
      score: score || 0,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error in createUser controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const {
      name,
      email,
      password, // include password for update
      phone,
      address,
      bloodGroup,
      allergies,
      medicalCondition,
      type,
      request,
      status,
      score,
    } = req.body;

    const updatedUser = await Volunteer.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password, // update password if provided
        phone,
        address,
        bloodGroup,
        allergies,
        medicalCondition,
        type,
        request,
        status,
        score,
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
    const deleteUser = await Volunteer.findByIdAndDelete(req.params.id);

    if (!deleteUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(deleteUser);
  } catch (error) {
    console.error("error in deleteUser controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}
