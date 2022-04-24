import express from "express";
import { authPage } from "../controllers/auth.controller.js";

const router = express.Router();

router.all("/login", authPage );
router.all("/register", authPage );
router.get("/logout", authPage );

export default router;