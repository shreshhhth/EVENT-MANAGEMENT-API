import express from 'express';
import { cancelRegistration, registerForEvent } from '../controllers/registrationController.js';


const registrationRouter = express.Router();

registrationRouter.post('/register', registerForEvent)
registrationRouter.post('/cancel-register', cancelRegistration)

export default registrationRouter