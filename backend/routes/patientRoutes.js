import { Router } from "express";
import {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient
} from "../controllers/patientController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth(["admin"]), createPatient);
router.put("/:id", auth(["admin"]), updatePatient);
router.delete("/:id", auth(["admin"]), deletePatient);
router.get("/", auth(["admin", "user"]), getPatients);


export default router;
