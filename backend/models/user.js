
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, index: true },
  passwordHash: String,
  role: { type: String, enum: ["admin", "user"], default: "user" }
}, { timestamps: true });
export default mongoose.model("User", userSchema);
