import express from "express";
import {adminOnlyMiddleware, mustLoginMiddleware} from "../middleware/auth.middleware.js";
import * as adminController from "../controllers/admin.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const adminRoute = new express.Router();
adminRoute.use(mustLoginMiddleware);
adminRoute.use(adminOnlyMiddleware);

adminRoute.get("/admin/dashboard", adminController.dashboard);
adminRoute.get("/admin/merchandise", adminController.merchandise);
adminRoute.post("/admin/merchandise", upload.single("image"), adminController.addMerchandise);
adminRoute.post("/admin/merchandise/update",upload.single("image"), adminController.updateMerchandise);
adminRoute.post("/admin/merchandise/delete",adminController.deleteMerchandise);
adminRoute.post("/admin/merchandise/details", adminController.addMerchandiseDetail);
adminRoute.get("/admin/orders", adminController.getOrder);
adminRoute.post("/admin/orders/update", adminController.updateStatus);

export {
    adminRoute
}
