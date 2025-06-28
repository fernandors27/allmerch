import express from "express";
import {mustLoginMiddleware, userOnlyMiddleware} from "../middleware/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const userRouter = new express.Router();
userRouter.use(mustLoginMiddleware);

userRouter.get("/dashboard", userOnlyMiddleware, userController.dashboard);
userRouter.get("/profile", userOnlyMiddleware, userController.profile);
userRouter.post("/profile", userOnlyMiddleware, userController.updateProfile);
userRouter.get("/orders", userOnlyMiddleware, userController.orders);
userRouter.post("/orders_item", userOnlyMiddleware, userController.checkoutAll);
userRouter.get("/charts", userOnlyMiddleware, userController.charts);
userRouter.get("/logout", userController.logout);
userRouter.get("/merchandise/details/:id", userOnlyMiddleware,userController.merchandiseDetail);
userRouter.post("/merchandise/add_to_chart/:id/:price", userOnlyMiddleware,userController.addChart);
userRouter.post("/charts/delete", userOnlyMiddleware, userController.deleteChart);

userRouter.get("/bundle/bundle_section", (req, res) => {
    res.render("bundle_section", {
        user: res.locals.user,
        // atau data lain yang ingin kamu render
    });
});

export {
    userRouter
}
