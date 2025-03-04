// controllers/userController.js
import User from '../models/User.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update user role (Admin only)
export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User role updated", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save();
        res.status(200).json({ message: "User updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while updating user." });
    }
};