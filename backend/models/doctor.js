
import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  weeklyHours: Number,
  preferences: [String]
}, { timestamps: true });
export default mongoose.model("Doctor", doctorSchema);
