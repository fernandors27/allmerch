import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response.error.js";
import { validate } from "../validations/validation.js";
import { addMerchandiseDetailValidation } from "../validations/merchandise.detail.validation.js";

const addMerchandiseDetail = async (request) => {
    const data = validate(addMerchandiseDetailValidation, request);

    const merchandise = await prismaClient.merchandise.findUnique({
        where: { id: data.id_merchandise }
    });

    if (!merchandise) {
        throw new ResponseError(404, "Merchandise not found");
    }

    // Hapus semua detail lama untuk merchandise ini
    await prismaClient.merchandiseDetail.deleteMany({
        where: { id_merchandise: data.id_merchandise }
    });

    // Insert semua detail baru (baik yang lama + baru di form)
    const createdDetails = await Promise.all(
        data.details.map(detailText => {
            return prismaClient.merchandiseDetail.create({
                data: {
                    id_merchandise: data.id_merchandise,
                    detail: detailText
                }
            });
        })
    );

    return createdDetails;
};

export default {
    addMerchandiseDetail
}
