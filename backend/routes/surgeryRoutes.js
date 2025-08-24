import express from "express";
import {
  createSurgery,
  getSurgeries,
  getSurgery,
  updateSurgery,
  deleteSurgery,
} from "../controllers/surgeryController.js";

const router = express.Router();

// CRUD routes
router.post("/", createSurgery);
router.get("/", getSurgeries);
router.get("/:id", getSurgery);
router.put("/:id", updateSurgery);
router.delete("/:id", deleteSurgery);

export default router;
