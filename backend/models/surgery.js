
import mongoose from "mongoose";
const surgerySchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  surgeon: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  nurses: [{ type: String }], 
  ot: { type: mongoose.Schema.Types.ObjectId, ref: "OperatingTheater", required: true },
  date: { type: Date, required: true },        
  startTime: { type: String, required: true },  
  endTime: { type: String, required: true },
  remarks: String,
  status: { type: String, enum: ["scheduled","postponed","cancelled","completed","emergency"], default: "scheduled" },

}, { timestamps: true });

export default mongoose.model("Surgery", surgerySchema);
