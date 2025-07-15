import { db } from "../libs/prisma.js";

export const createUser = async (req, res) => {
    try {
        const { email, name } = req.body

        const userCount = await db.user.count({
            where: { email: email }
        })

        const exists = userCount > 0;

        if (exists) {
            res.json({ success: false, message: "User already exists" })
        }

        const user = await db.user.create({
            data: {
                email, name
            }
        })
        res.status(200).json({ success: true, message: "User created successfully", user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


