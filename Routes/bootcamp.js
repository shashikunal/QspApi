import { Router } from "express";
import { GetBootCamps } from "../controllers/bootcamp";
let router = Router();
router.route("/").get(GetBootCamps);

export { router as BootCamp };
