import { Router } from "express";
import {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth(["admin"]), createDoctor);
router.put("/:id", auth(["admin"]), updateDoctor);
router.delete("/:id", auth(["admin"]), deleteDoctor);


router.get("/", auth(["admin", "user"]), getDoctors);


export default router;
