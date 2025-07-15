import { db } from "../libs/prisma.js";

export const registerForEvent = async (req, res) => {
    const { userId, eventId } = req.body
    try {
        const event = await db.event.findUnique({
            where: {
                id: Number(eventId),
            },
            include: {
                registrations: true
            }
        })
        //Checking if event is there or not /// checking for registration to upcoming events only///Checking for capacity

        const error = !event ? 'Event not found' : new Date(event.date_time) < new Date() ? 'Cannot register for past events' : event.registrations.length >= event.capacity ? 'Event Full' : null

        if (error) {
            return res.json({ success: false, message: error })
        }
        //Checking for existing registration for the event
        const existing = await db.registration.findUnique({
            where: {
                user_id_event_id: {
                    user_id: Number(userId),
                    event_id: Number(eventId),
                },
            },
        })
        if (existing) return res.json({ success: false, message: 'Already Registered' })

        //Creating Registration
        await db.registration.create({
            data: {
                user_id: Number(userId),
                event_id: Number(eventId)
            }
        })
        res.status(200).json({ success: true, message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const cancelRegistration = async (req, res) => {

    const { userId, eventId } = req.body
    try {
        const registration = await db.registration.findUnique({
            where: {
                user_id_event_id: { user_id: Number(userId), event_id: Number(eventId) }
            }
        })
        if (!registration) return res.json({ success: false, message: "Not Registered" })

        await db.registration.delete({
            where: {
                id: registration.id
            }
        })
        res.status(200).json({ success: true, message: "Registration Cancelled Successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}