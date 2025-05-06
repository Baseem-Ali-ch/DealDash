import express from "express";
import * as authController from "../controllers/admin/auth.controller";
import * as categoryController from "../controllers/admin/categroy.controller";
import * as brandsController from '../controllers/admin/brand.controller';
import * as productsController from '../controllers/admin/product.controller';
import { verifyToken } from "../middlewares/auth";
const adminRoutes = express.Router();

// Define routes for admin authentication
adminRoutes.post("/login", authController.login);

// Define routes for category management
adminRoutes.get("/category", categoryController.getCategories);
adminRoutes.post("/category", verifyToken, categoryController.createCategory);
adminRoutes.put("/category/:id", verifyToken, categoryController.updateCategory);
adminRoutes.delete("/category/:id", verifyToken, categoryController.deleteCategory);
adminRoutes.patch('/categories/:categoryId/toggle-status', verifyToken, categoryController.toggleCategoryStatus);

// Define routes for brand management
adminRoutes.get("/brand",brandsController.getBrands);
adminRoutes.post("/brand", verifyToken,brandsController.createBrands);
adminRoutes.put("/brand/:id", verifyToken,brandsController.updateBrands);
adminRoutes.delete("/brand/:id", verifyToken,brandsController.deleteBrands);
adminRoutes.patch('/brand/:brandId/toggle-status', verifyToken,brandsController.toggleBrandsStatus);

// Define routes for product management
adminRoutes.get("/product", productsController.createProduct); 

export default adminRoutes;
