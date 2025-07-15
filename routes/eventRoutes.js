import express from 'express';
import { createEvent, getAllEvents, getAllEventsStats, upcomingEvents } from '../controllers/eventController.js';


const eventRouter = express.Router();

eventRouter.post('/create', createEvent)
eventRouter.get('/all', getAllEvents)
eventRouter.get('/events-stats', getAllEventsStats)
eventRouter.get('/upcoming-events', upcomingEvents)


export default eventRouter;