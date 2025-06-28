import { prismaClient } from "../application/database.js";
import {v4 as uuid} from "uuid";

export const createSession = async (email) => {
    const token = uuid().toString();

    await prismaClient.session.create({
        data: {
            token,
            email_user: email,
        },
    });

    return token;
};

export const getUserFromSession = async (token) => {
    if (!token) return null;

    const session = await prismaClient.session.findUnique({
        where: { token },
        include: { user: true },
    });

    return session?.user || null;
};

export const destroySession = async (token) => {
    await prismaClient.session.deleteMany({
        where: { token },
    });
};
