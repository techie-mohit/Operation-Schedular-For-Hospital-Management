import { Router } from "express";
import {
  createSurgery,
  getSurgeries,
  getSurgery,
  updateSurgery,
  deleteSurgery
} from "../controllers/surgeryController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth(["admin"]), createSurgery);
router.put("/:id", auth(["admin"]), updateSurgery);
router.delete("/:id", auth(["admin"]), deleteSurgery);
router.get("/", auth(["admin", "user"]), getSurgeries);
router.get("/:id", auth(["admin", "user"]), getSurgery);

export default router;
