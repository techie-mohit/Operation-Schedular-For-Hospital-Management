import Doctor from "../models/doctor.js";

// Create Doctor
export const createDoctor = async (req, res, next) => {
  try {
    const { name, specialization, weeklyHours, preferences } = req.body;

    const doctor = new Doctor({
      name,
      specialization,
      weeklyHours,
      preferences
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    console.error("Error:", err.message);   
    res.status(500).json("Internal Server Error");
  }
};

// Get all Doctors
export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error("Error:", err.message);   
    res.status(500).json("Internal Server Error");
  }
};


// Update Doctor
export const updateDoctor = async (req, res, next) => {
  try {
    const { name, specialization, weeklyHours, preferences } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, specialization, weeklyHours, preferences },
      { new: true, runValidators: true }
    );

    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};

// Delete Doctor
export const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};
