import express from "express";
import {publicRouter} from "../routes/public.route.js";
import mustacheExpress from "mustache-express";
import * as path from "node:path";
import { fileURLToPath } from 'url';
import {userRouter} from "../routes/user.route.js";
import cookieParser from "cookie-parser";
import {adminRoute} from "../routes/admin.route.js";
// import bundleRouter from "../routes/bundle-route.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const web = express();

web.engine("mustache", mustacheExpress());
web.set("view engine", "mustache");
web.set("views", path.join(__dirname, "..", "views"));

web.use(express.static(path.join(__dirname, "..", "public")));
web.use(express.urlencoded({ extended: true }));
web.use(cookieParser());
web.use(publicRouter);
web.use(userRouter);
web.use(adminRoute);
