import {prismaClient} from "../application/database.js";

const index = async (req, res, next) => {
    try {
        const categories = await prismaClient.category.findMany({
            include: {merchandises: true}
        });
        console.log("CATEGORIES", categories);
        res.render('index', {
            user: res.locals.user,
            categories: categories.length > 0 ? categories : undefined,
        });
    } catch (e) {
        next(e);
    }
}

const produk = async (req, res, next) => {
    try {
        const merchandises = await prismaClient.merchandises.findMany();
        res.render('index', {
            user: res.locals.user,
            merchandises
        });
    } catch (e) {
        next(e);
    }
}

const bundleSection = async (req, res, next) => {
    try {
        const merchandises = await prismaClient.merchandise.findMany();
        res.render("bundle_section", {
            user: res.locals.user,
            merchandises // <-- WAJIB dikirim ke mustache
        });
    } catch (err) {
        next(err);
    }
};

export default {
    index,
    produk,
    bundleSection
}
