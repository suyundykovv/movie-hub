import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["users", "Admin"], default: "users" }, // Роль пользователя
  },
  { timestamps: true }
);

const users = mongoose.model("users", UserSchema);
export default users;