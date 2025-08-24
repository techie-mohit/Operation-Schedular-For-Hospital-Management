import OperationTheatre from '../models/operationTheatre.js';

// Create OT
export const createOT = async (req, res, next) => {
  try {
    const { otId, capabilities, active } = req.body;

    const ot = new OperationTheatre({
      otId,
      capabilities,
      active
    });

    await ot.save();
    res.status(201).json(ot);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};

// Get all OTs
export const getOTs = async (req, res, next) => {
  try {
    const ots = await OperationTheatre.find();
    res.json(ots);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};


// Update OT
export const updateOT = async (req, res, next) => {
  try {
    const { otId, capabilities, active } = req.body;

    const ot = await OperationTheatre.findByIdAndUpdate(
      req.params.id,
      { otId, capabilities, active },
      { new: true, runValidators: true }
    );

    if (!ot) return res.status(404).json({ error: "Operating Theater not found" });
    res.json(ot);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};

// Delete OT
export const deleteOT = async (req, res, next) => {
  try {
    const ot = await OperationTheatre.findByIdAndDelete(req.params.id);
    if (!ot) return res.status(404).json({ error: "Operating Theater not found" });
    res.json({ message: "Operating Theater deleted" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json("Internal Server Error");
  }
};
