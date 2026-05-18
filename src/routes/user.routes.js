import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

// Register Route
router.post("/register", registerUser);

// Login Route
// router.post("/login", login);

export default router;