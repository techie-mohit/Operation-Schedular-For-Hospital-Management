import { Router } from "express";
import {
  createOT,
  getOTs,
  updateOT,
  deleteOT
} from "../controllers/operationController.js";
import { auth } from "../middleware/auth.js";

const router = Router();


router.post("/", auth(["admin"]), createOT);
router.put("/:id", auth(["admin"]), updateOT);
router.delete("/:id", auth(["admin"]), deleteOT);
router.get("/", auth(["admin", "user"]), getOTs);

export default router;
