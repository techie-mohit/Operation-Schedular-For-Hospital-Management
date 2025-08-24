import Patient from "../models/patient.js";

// Create Patient
export const createPatient = async (req, res, next) => {
  try {
    const { name, dob, mrn, remarks } = req.body;

    const patient = new Patient({
      name,
      dob,
      mrn,
      remarks
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
   console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};

// Get all Patients
export const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};

;

// Update Patient
export const updatePatient = async (req, res, next) => {
  try {
    const { name, dob, mrn, remarks } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { name, dob, mrn, remarks },
      { new: true, runValidators: true }
    );

    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};

// Delete Patient
export const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json({ message: "Patient deleted" });
  } catch (err) {
   console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};
