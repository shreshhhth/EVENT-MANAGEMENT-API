import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import registrationRouter from './routes/registrationRoutes.js'
import eventRouter from './routes/eventRoutes.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//Middlewares
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10mb' }))

//Routes
app.use('/api/events', eventRouter)
app.use('/api/users', userRouter)
app.use('/api/registrations', registrationRouter)

//Server Start
app.listen(PORT, () => {
    console.log(`Server running on port:, ${PORT}`)
})