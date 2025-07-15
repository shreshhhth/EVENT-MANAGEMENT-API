# Event Management API 

This is the markdown file for the task - Event Management API


# File Structure

├── EVENT MANAGEMENT API/ # Express backend
│ ├── controllers/
│ │ ├── eventController.js
│ │ ├── registrationController.js
│ │ ├── userController.js
│ ├── libs/
│ │ ├── prisma.js
│ ├── routes/
│ │ ├── eventRoutes.js
│ │ ├── registrationRoutes.js
│ │ ├── userRoutes.js
│ ├── app.js
│ └── package.json
├── .env.example
├── .gitignore
├── README.md
└── package.json (root)

## Setup Instructions

1. Clone the Repository
```
git clone https://github.com/shreshhhth/EVENT-MANAGEMENT-API
```
2. Install Dependencies
```
npm install
```
3. Configure Environment Variables
```
DATABASE_URL=postgresql://user:password@localhost:5432/your_database
PORT = 3000

```
4. Setup Prisma & Database
```
npx prisma migrate dev --name init
npx prisma generate
```
5. Start the Server
```
npm run dev
```
The API will be running on ```http://localhost:3000/```(or your configured port).
## API Endpoints

## 📌 Create User
**POST**`/api/users/create`

- **Body Parameters:**
```json
{
  "email": "Test1@gmail.com",
  "name": "Test 1"
}
```
- **Success response:**
```json
{
	"success":  true,
	"message":  "User created successfully",
	"user":  {
	"id":  3,
	"name":  "Test1",
	"email":  "test1@gmail.com",
	"createdAt":  "2025-07-15T13:59:40.707Z",
	"updatedAt":  "2025-07-15T13:59:40.707Z"
	}
}
```
- **Failure Response:**
```json
{
  "success": "false",
  "message": "User already exists"
}
```
## 📌  Registration APIs
### -Register To An Event
**POST**`/api/registrations/register`

- **Body Parameters:**
```json
{
  "userId": "1",
  "eventId": "1"
}
```
- **Success response:**
```json
{
"success":  true,
"message":  "User registered successfully"
}
```
- **Failure Response:**
```json
{
  "success": "false",
  "message": "Already Registered" / "Event not found" / "Cannot register for past events" / "Event full"
}
```
### -Cancel Registered Event
**POST**`/api/registrations/cancel-register`

- **Body Parameters:**
```json
{
  "userId": "1",
  "eventId": "1"
}
```
- **Success response:**
```json
{
"success":  true,
"message":  "Registration Cancelled Successfully"
}
```
- **Failure Response:**
```json
{
  "success": "false",
  "message": "Not Registered"
}
```
## 📌  Event  APIs
### -Create Event
**POST**`/api/events/create`

- **Body Parameters:**
```json
{
  "title": "Event Title",
  "date_time": "2025-07-15T13:59:40.707Z",
  "venue": "Venue",
  "capacity": "900"
}
```
- **Success response:**
```json
{
"success":  true,
"event_id":  5
}
```
- **Failure Response:**
```json
{
  "success": "false",
  "message": "Invalid Capacity"
}
```
### -Get All Event
**GET**`/api/events/all`

- **Success response:**
```json
{
"success":  true,
"events":  [...]
}
```
- **Failure Response:**
```json
{
  "success": "false",
  "message": "No event is there"
}
```
### -Get Event Stats
**GET**`/api/events/events-stats`

- **Success response:**
```json
{
	"success":  true,
	"stats":  [
		{
		"id":  1,
		"title":  "Event Title",
		"capacity":  900,
		"totalRegistrations":  1,
		"remainingCapacity":  899,
		"percentageUsed":  0.11
		}
	]
}
```
- **Failure Response:**
```json
{
  "success": "false",
  "message": "status 500" / "Internal Error........."
}
```
### -Get Upcoming Event
**GET**`/api/events/upcoming-events`

- **Success response:**
```json
{
"success":  true,
"events":  [
		{
			"id":  1,
			"title":  "Event Title",
			"date_time":  "2025-08-01T15:00:00.000Z",
			"venue":  "Venue",
			"capacity":  900,
			"createdAt":  "2025-07-15T14:09:39.255Z",
			"updatedAt":  "2025-07-15T14:09:39.255Z"
		}
	]
}
```
- **Failure Response:**
```json
{
  "success": "false",
  "message": "status 500" / "Internal Error........."
}
```