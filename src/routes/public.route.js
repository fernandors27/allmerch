import express from "express";
import homeController from "../controllers/home.controller.js";
import userController from "../controllers/user.controller.js";
import {mustNotLoginMiddleware} from "../middleware/auth.middleware.js";

const publicRouter = new express.Router();

publicRouter.get("/", mustNotLoginMiddleware, homeController.index);
publicRouter.get("/produk", mustNotLoginMiddleware, homeController.produk);
publicRouter.get("/login", mustNotLoginMiddleware, userController.getLogin);
publicRouter.get("/register", mustNotLoginMiddleware, userController.getRegister);

publicRouter.get("/bundle/bundle_section", homeController.bundleSection);

publicRouter.post("/login", userController.postLogin);
publicRouter.post("/register", userController.postRegister);

publicRouter.get("/bundle/bundle_section", (req, res) => {
    res.render("bundle_section", {
        user: res.locals.user,
        // atau data lain yang ingin kamu render
    });
});

export {
    publicRouter
}
