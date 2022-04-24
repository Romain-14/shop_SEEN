import { findAll } from "../../controllers/product.controller.js";
import express from "express";

const router = express.Router();

router.get("/", findAll);

export default router;
