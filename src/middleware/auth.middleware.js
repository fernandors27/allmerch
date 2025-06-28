import { prismaClient } from "../application/database.js";

/**
 * Middleware untuk memastikan user sudah login.
 */
export const mustLoginMiddleware = async (req, res, next) => {
    const token = req.cookies?.session_token;
    if (!token) return res.redirect("/login");

    const session = await prismaClient.session.findUnique({ where: { token } });
    if (!session) return res.redirect("/login");

    const user = await prismaClient.user.findUnique({
        where: { email: session.email_user },
        select: { name: true, email: true, address: true, role: true }
    });
    if (!user) return res.redirect("/login");

    res.locals.user = user;
    next();
};

/**
 * Middleware untuk halaman publik — redirect jika sudah login.
 */
export const mustNotLoginMiddleware = async (req, res, next) => {
    const token = req.cookies?.session_token;
    if (!token) return next();

    const session = await prismaClient.session.findUnique({ where: { token } });
    if (!session) return next();

    const user = await prismaClient.user.findUnique({
        where: { email: session.email_user },
        select: { name: true, email: true, address: true, role: true }
    });
    if (!user) return next();

    res.locals.user = user;

    // redirect hanya jika halaman GET (jangan redirect POST misalnya form login)
    if (req.method === "GET") {
        return res.redirect("/dashboard");
    }

    next();
};

export const userOnlyMiddleware = (req, res, next) => {
    const user = res.locals.user;

    if (user.role !== "user") {
        return res.redirect("/admin/dashboard");
    }

    next();
};

/**
 * Middleware untuk admin.
 */
export const adminOnlyMiddleware = (req, res, next) => {
    const user = res.locals.user;

    if (user.role !== "admin") {
        return res.redirect("/");
    }

    next();
};
