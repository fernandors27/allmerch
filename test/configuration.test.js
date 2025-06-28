import * as bcrypt from "bcrypt";
import {prismaClient} from "../src/application/database.js";

describe("Run this test for first setup installation", function() {
    beforeEach(async () => {
        await prismaClient.user.deleteMany();
    })

    it("Should register admin", async () => {
        const admin = {
            email: "admin@allmerch.com",
            name: "Admin-001",
            password: await bcrypt.hash("admin12345", 10),
            role: "admin"
        }
        const result = await prismaClient.user.create({
            data: admin,
            select: {
                email: true,
                name: true,
                password: true,
                role: true
            }
        })

        expect(result.email).toEqual("admin@allmerch.com")
        expect(result.name).toEqual("Admin-001")
        expect(result.role).toEqual("admin")
        expect(await bcrypt.compare("admin12345", result.password)).toBe(true);
    })
})