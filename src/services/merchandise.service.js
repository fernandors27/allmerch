import { prismaClient } from "../application/database.js";
import {v4 as uuid} from "uuid";
import {addMerchandiseValidation, updateMerchandiseValidation} from "../validations/merchandise.validation.js";
import path from "path";
import fs from "fs";
import {validate} from "../validations/validation.js";
import {ResponseError} from "../error/response.error.js";

const add = async (data, imageFile) => {
    const { error, value } = addMerchandiseValidation.validate(data);
    if (error) {
        throw new Error(error.message);
    }

    if (!imageFile) {
        throw new Error("Gambar merchandise wajib diunggah.");
    }

    const merchandiseId = uuid().slice(0, 5);

    const folderPath = path.resolve("src/public/img/merchandises", merchandiseId);
    fs.mkdirSync(folderPath, { recursive: true });

    const filePath = path.join(folderPath, imageFile.originalname);
    fs.writeFileSync(filePath, imageFile.buffer);

    const imageUrl = `/img/merchandises/${merchandiseId}/${imageFile.originalname}`;

    const merchandise = await prismaClient.merchandise.create({
        data: {
            id: merchandiseId,
            name: value.name,
            id_category: value.id_category,
            stock: value.stock,
            price: value.price,
            image_url: imageUrl
        }
    });

    return merchandise;
};

const getAll = async () => {
    return prismaClient.merchandise.findMany({
        include: {
            category: true,
            details: true,
            charts: true
        }
    });
};

const update = async (request, imageFile) => {
    const merchandise = validate(updateMerchandiseValidation, request);

    const existingMerchandise = await prismaClient.merchandise.findUnique({
        where: {
            id: merchandise.id
        }
    });

    if (!existingMerchandise) {
        throw new ResponseError(404, "Merchandise not found");
    }

    const data = {};
    if (merchandise.name) {
        data.name = merchandise.name;
    }
    if (merchandise.id_category) {
        data.id_category = merchandise.id_category;
    }
    if (merchandise.stock) {
        data.stock = merchandise.stock;
    }
    if (merchandise.price) {
        data.price = merchandise.price;
    }
    if (imageFile) {
        const merchandiseId = merchandise.id;

        // Path folder dan file lama
        const folderPath = path.resolve("src/public/img/merchandises", merchandiseId);
        const oldImagePath = path.join("src/public", existingMerchandise.image_url);

        console.log("Existing image url", existingMerchandise.image_url)
        console.log("Folder path", folderPath)
        console.log("old image path", oldImagePath)

        // Hapus file lama jika ada
        if (fs.existsSync(oldImagePath)) {
            try {
                console.log("BERHASIl HAPUS")
                fs.unlinkSync(oldImagePath);
            } catch (err) {
                console.error("Failed to delete old image:", err.message);
            }
        } else {
            console.log("TIDAK ADA FILE LAMA")
        }

        // Buat folder jika belum ada
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Simpan file baru
        const newFilePath = path.join(folderPath, imageFile.originalname);
        fs.writeFileSync(newFilePath, imageFile.buffer);

        // Path relatif disimpan ke database
        const newImageUrl = `/img/merchandises/${merchandiseId}/${imageFile.originalname}`;
        data.image_url = newImageUrl;
    }

    return prismaClient.merchandise.update({
        where: {
            id: merchandise.id
        },
        data: data,
        include: {
            category: true,
            details: true,
            charts: true
        }
    })
}

const getByID = async (id) => {
    const merchandise = await prismaClient.merchandise.findUnique({
        where: { id: id },
        include: {
            category: true,
            details: true,
            charts: true
        }
    });

    if (!merchandise) {
        throw new Error("Merchandise not found");
    }

    return merchandise;
};

const deleteByID = async (id) => {
    const merchandise = await prismaClient.merchandise.findUnique({
        where: { id }
    });

    if (!merchandise) {
        throw new ResponseError(404, "Merchandise not found");
    }

    if (merchandise.image_url) {
        const imagePath = path.join("src/public", merchandise.image_url);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        const folderPath = path.dirname(imagePath);
        if (fs.existsSync(folderPath) && fs.readdirSync(folderPath).length === 0) {
            fs.rmdirSync(folderPath);
        }
    }

    await prismaClient.merchandiseDetail.deleteMany({
        where: { id_merchandise: id }
    });
    await prismaClient.merchandise.delete({
        where: { id }
    });


    return { message: "Merchandise deleted successfully" };
};

export default {
    add,
    getAll,
    update,
    getByID,
    deleteByID
}
