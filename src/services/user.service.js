import {ResponseError} from "../error/response.error.js";
import {validate} from "../validations/validation.js";
import {
    loginUserValidation,
    registerUserValidation,
    updateUserValidation
} from "../validations/user.validation.js";
import {prismaClient} from "../application/database.js";
import * as bcrypt from "bcrypt";
import {createSession, destroySession} from "./session.service.js";

const login = async (req, res) => {
    const loginRequest = validate(loginUserValidation, req);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            email: true,
            role: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Email or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password wrong");
    }

    const token = await createSession(user.email);

    // Set cookie
    res.cookie('session_token', token, {
        httpOnly: true, // supaya tidak bisa diakses dari JS
        maxAge: 24 * 60 * 60 * 1000, // 7 hari
        path: '/',
        sameSite: 'lax'
    });

    return user;
}

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Email already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);
    user.role = "user"

    return prismaClient.user.create({
        data: user,
        select: {
            email: true,
            name: true
        }
    });
}

const profile = async (email) => {
    return  prismaClient.user.findUnique({
        where: {email}
    });
}

const updateProfile = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "user is not found");
    }

    const data = {};
    if (user.name) {
        data.name = user.name;
    }
    if (user.password || user.password !== "") {
        data.password = await bcrypt.hash(user.password, 10);
    }
    if (user.address) {
        data.address = user.address;
    }

    return prismaClient.user.update({
        where: {
            email: user.email
        },
        data: data,
        select: {
            email: true,
            name: true,
            address: true
        }
    })
}

export default {
    login,
    register,
    profile,
    updateProfile,
}