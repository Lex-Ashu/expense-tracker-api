# Expense Tracker API

A RESTful API for tracking personal expenses built with TypeScript, Express, and MongoDB.

## Features

- Create, Read, Update, Delete expenses
- Filter by category
- Filter by date range
- Sort by amount or date
- Pagination
- Clean OOP architecture (Repository → Service → Controller)

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with MongoDB URI
4. Run: `npm run dev`

## API Endpoints

- `POST /api/expenses` - Create expense
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get single expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## Query Parameters

- `page` - Page number
- `limit` - Results per page
- `category` - Filter by category (Food, Transport, Shopping, Bills, Entertainment, Other)
- `startDate` - Filter from date (YYYY-MM-DD)
- `endDate` - Filter to date (YYYY-MM-DD)
- `sortBy` - Sort field (amount, date)
- `order` - Sort order (asc, desc)

## Example
```json
POST /api/expenses
{
  "amount": 500,
  "category": "Food",
  "description": "Lunch",
  "date": "2024-02-02"
}
```
## Author
#### Ashu Choudhary