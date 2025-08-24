
import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  mrn: { type: String, unique: true }, // medical record number
  remarks: String
}, { timestamps: true });
export default mongoose.model("Patient", patientSchema);
