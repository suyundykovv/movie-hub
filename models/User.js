import mongoose from 'mongoose';

<<<<<<< Updated upstream
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

export default mongoose.model('User', userSchema);
=======
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["users", "Admin"], default: "users" }, // Роль пользователя
  },
  { timestamps: true }
);
>>>>>>> Stashed changes

const users = mongoose.model("users", UserSchema);
export default users;