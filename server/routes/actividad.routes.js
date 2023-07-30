import { Router } from "express";
import { getActividad } from "../controllers/actividad.controller.js";

const router = Router();

router.get("/actividad",getActividad);
export default router;