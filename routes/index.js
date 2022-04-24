import express from "express";
import customerAPI_routes from "./api/customer.js";
import { homePage } from "../controllers/page.controller.js";
import { shopPage } from "../controllers/page.controller.js";
import auth_Route from './auth.js';
import mw from '../middleware/index.js'

const router = express.Router();

router.use("/api/customer", customerAPI_routes);
router.use("/authentication", mw, auth_Route);

router.get("/", mw, homePage);
router.get("/shop", mw , shopPage);
router.get("/*", (req,res)=>{
    res.render('pageNotFound')
});

export default router;
