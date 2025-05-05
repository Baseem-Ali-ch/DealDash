import express from "express";
import * as authController from "../controllers/admin/auth.controller";
import * as categoryController from "../controllers/admin/categroy.controller";
import * as brandsController from '../controllers/admin/brand.controller';
import { verifyToken } from "../middlewares/auth";
const adminRoutes = express.Router();

// Define routes for admin authentication
adminRoutes.post("/login", authController.login);

// Define routes for category management
adminRoutes.get("/category", verifyToken, categoryController.getCategories);
adminRoutes.post("/category", verifyToken, categoryController.createCategory);
adminRoutes.put("/category/:id", verifyToken, categoryController.updateCategory);
adminRoutes.delete("/category/:id", verifyToken, categoryController.deleteCategory);
adminRoutes.patch('/categories/:categoryId/toggle-status', verifyToken, categoryController.toggleCategoryStatus);

adminRoutes.get("/brand", brandsController.getBrands);
adminRoutes.post("/brand", brandsController.createBrands);
adminRoutes.put("/brand/:id", brandsController.updateBrands);
adminRoutes.delete("/brand/:id", brandsController.deleteBrands);
adminRoutes.patch('/brand/:brandId/toggle-status',brandsController.toggleBrandsStatus);



export default adminRoutes;
