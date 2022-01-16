import { Router } from "express";

import {
  CreateBootCamps,
  getBootCamp,
  GetBootCamps,
  updateBootCamp,
  deleteBootCamp,
} from "../controllers/bootcamp";
let router = Router();
router.route("/").get(GetBootCamps);
router.route("/:id").get(getBootCamp);
router.route("/").post(CreateBootCamps);
router.route("/:id").put(updateBootCamp);
router.route("/:id").delete(deleteBootCamp);

export { router as BootCamp };
