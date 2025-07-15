import { db } from "../libs/prisma.js";

export const createEvent = async (req, res) => {

    const { title, date_time, venue, capacity, } = req.body;
    if (capacity <= 0 || capacity > 1000) {
        return res.json({ success: false, message: "Invalid Capacity" })
    }
    try {
        const event = await db.event.create({
            data: {
                title, date_time: new Date(date_time), venue, capacity
            }
        })
        res.status(200).json({ success: true, event_id: event.id })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


export const getAllEvents = async (req, res) => {
    try {
        const events = await db.event.findMany();
        if (!events) {
            res.json({ success: false, message: "No event is there" })
        }
        res.status(200).json({ success: true, events, })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

export const upcomingEvents = async (req, res) => {
    try {
        const events = await db.event.findMany({
            where: {
                date_time: {
                    gt: new Date
                },
            },
            orderBy: [{
                date_time: 'asc'
            }, {
                venue: 'asc'
            }]
        })
        res.status(200).json({ success: true, events })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

export const getAllEventsStats = async (req, res) => {
    try {
        const events = await db.event.findMany({
            select: {
                id: true,
                title: true,
                capacity: true,
                _count: { select: { registrations: true } }
            }
        })
        const stats = events.map(event => {
            const total = event._count.registrations;
            const remaining = event.capacity - total;
            const percentage = ((total / event.capacity) * 100).toFixed(2)

            return {
                id: event.id,
                title: event.title,
                capacity: event.capacity,
                totalRegistrations: total,
                remainingCapacity: remaining,
                percentageUsed: Number(percentage),
            }
        })

        res.status(200).json({ success: true, stats })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}