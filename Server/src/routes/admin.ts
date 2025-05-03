import express from "express";
import * as authController from "../controllers/admin/auth.controller";
const adminRoutes = express.Router();

// Define routes for admin authentication
adminRoutes.post("/auth/login", authController.login);

export default adminRoutes;

