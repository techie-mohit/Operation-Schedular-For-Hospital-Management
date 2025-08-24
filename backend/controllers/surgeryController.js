import Surgery from "../models/surgery.js";

// ✅ Create Surgery
export const createSurgery = async (req, res, next) => {
  try {
    const {
      patient,
      surgeon,
      nurses,
      ot,
      date,
      startTime,
      endTime,
      remarks,
      status,
    } = req.body;

    const surgery = new Surgery({
      patient,
      surgeon,
      nurses,
      ot,
      date,
      startTime,
      endTime,
      remarks,
      status,
    });

    await surgery.save();
    const populated = await Surgery.findById(surgery._id)
      .populate("patient surgeon ot");

    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

// ✅ Get all Surgeries
export const getSurgeries = async (req, res, next) => {
  try {
    const surgeries = await Surgery.find()
      .populate("patient surgeon ot");
    res.json(surgeries);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};

// ✅ Get Surgery by ID
export const getSurgery = async (req, res, next) => {
  try {
    const surgery = await Surgery.findById(req.params.id)
      .populate("patient surgeon ot");

    if (!surgery) return res.status(404).json({ error: "Surgery not found" });
    res.json(surgery);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};

// ✅ Update Surgery
export const updateSurgery = async (req, res, next) => {
  try {
    const {
      patient,
      surgeon,
      nurses,
      ot,
      date,
      startTime,
      endTime,
      remarks,
      status,
    } = req.body;

    const surgery = await Surgery.findByIdAndUpdate(
      req.params.id,
      { patient, surgeon, nurses, ot, date, startTime, endTime, remarks, status },
      { new: true, runValidators: true }
    ).populate("patient surgeon ot");

    if (!surgery) return res.status(404).json({ error: "Surgery not found" });
    res.json(surgery);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};

// ✅ Delete Surgery
export const deleteSurgery = async (req, res, next) => {
  try {
    const surgery = await Surgery.findByIdAndDelete(req.params.id);
    if (!surgery) return res.status(404).json({ error: "Surgery not found" });
    res.json({ message: "Surgery deleted" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};
