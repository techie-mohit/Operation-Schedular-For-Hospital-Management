
import mongoose from "mongoose";
const otSchema = new mongoose.Schema({
  otId: { type: String, unique: true },
  capabilities: [String], // equipment, specialties
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model("OperationTheatre", otSchema);
