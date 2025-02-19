# Book Management API

A simple RESTful API built with Deno and Hono for managing books. This project demonstrates basic CRUD operations with in-memory storage.

## Prerequisites

- [Deno](https://deno.land/) (version 1.x or higher)

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd book-management-api
```

2. No additional dependencies need to be installed as Deno manages them automatically.

## Running the Project

Start the server by running:

```bash
deno run --allow-net app.ts
```

The server will start on `http://localhost:8000`

## API Endpoints

### Get all books

```
GET /books
```

### Get a specific book

```
GET /books/:id
```

### Create a new book

```
POST /books
```

Request body:

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "year": 2024
}
```

### Update a book

```
PUT /books/:id
```

Request body:

```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "year": 2024
}
```

### Delete a book

```
DELETE /books/:id
```

## Testing the API

You can test the API using cURL:

```bash
# Get all books
curl http://localhost:8000/books

# Create a new book
curl -X POST http://localhost:8000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"John Doe","year":2024}'

# Get a specific book (replace 1 with actual book ID)
curl http://localhost:8000/books/1

# Update a book
curl -X PUT http://localhost:8000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Book","author":"Jane Doe","year":2024}'

# Delete a book
curl -X DELETE http://localhost:8000/books/1
```

## Project Structure

```
book-api/
├── app.ts         # Main application file
├── README.md      # Project documentation
└── .gitignore     # Git ignore file
```

## Features

- CRUD operations for books
- TypeScript support
- Error handling
- CORS enabled
- In-memory data storage
- RESTful API design

## Error Responses

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Resource created
- 404: Resource not found
- 400: Bad request

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
