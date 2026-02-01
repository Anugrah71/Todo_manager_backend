# Task Manager (Backend)
A simple backend Task Manager built with Node.js, Express, and MongoDB. Supports task creation, status update
with controlled transitions, listing with filtering, and basic metrics.

---

## Features
- Create tasks with validation
- Update task status with allowed transitions:
  - todo -> in_progress
  - todo -> done
  - in_progress -> done
- List tasks filtered by status and sorted by creation time
- Metrics:
 - total tasks
 - count per status
 - average completion time
- MongoDB persistence

---

## Tech Stack
- Node.js
- Express
- MongoDB Atlas
- Mongoose

---

## SetUp & Run
### 1. Clone repository
```bash
git clone https://github.com/Anugrah71/Todo_manager_backend
cd Todo_manager
```
### 2. Install dependencies
```bash
npm install
```
### 3. Environment variables
Create `.env` in project root:
```env
MONGO_URI=your_mongodb_connection_string
```
### 4. Start server
```bash
node server.js
```
Server runs on:
```bash
http://localhost:5000
```
---
## API Endpoints
### Create Task
`POST` 
```bash
localhost:5000/createtask
```
Body:
```json
{
  "title": "Testing",
  "description": "backend task"
}
```
### Update Task Status
`PATCH`
```bash 
localhost:5000/updatestatus
```
Body:
```json
{
  "todoId": "<task_id>",
  "newStatus": "in_progress"
}

```
### List Tasks
#### `GET` 
Get Todo tasks
```bash
http://localhost:5000/tasks?status=todo 
```
Get in_progress tasks
```bash 
http://localhost:5000/tasks?status=in_progress
```
Get done tasks
```bash 
http://localhost:5000/tasks?status=done
```
Returns tasks filtered by status and sorted by newest first.

### Metrics
`GET` 
```bash 
localhost:5000/metrics
```
Return: 
  - total tasks
  - count per status
  - average completion time
Output:
```json
{
    "total": 6,
    "statusCounts": {
        "todo": 2,
        "in_progress": 0,
        "done": 4
    },
    "averageCompletionTime": "3.7910277777777774 minutes"
}
```

---
## Assumptions & Design Decisions
- MongoDB Atlas was used for persistence to simplify data storage and retrieval.
- Mongoose was chosen to automatically handle JSON formatting, unique IDs (`_id`), and timestamps (`created_at`, `updated_at`).
- MongoDB ObjectId is used as the task identifier instead of generating custom UUIDs.
- Status transitions are restricted using a transition map to keep business rules centralized and maintainable.
- Average completion time is calculated using `created_at` and `completed_at` timestamps.
- Tasks are sorted by creation time (newest first) for better usability.
- Status filtering is supported when listing tasks.
- Environment variables are used for sensitive configurations like MongoDB connection string.

---
## AI Usage
I used ChatGPT during this project mainly as a learning and debugging assistant.

It helped me with:
- Understanding the task requirements and edge cases
- Designing `API` structure and project flow
- Implementing status transition logic
- Debugging runtime and query issues
- Help with README.md file

I personally implemented the full project, including:
- setting up the backend locally
- writing controller and routing logic
- MongoDB and Mongoose integration
- Integrating `MongoDB Atlas`
- Implementing average completion time
- verifying data directly in MongoDB
- Testing all `API Endpoints` using `Postman`


