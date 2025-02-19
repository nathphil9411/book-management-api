import { Hono } from "https://deno.land/x/hono@v3.11.7/mod.ts";
import { cors } from "https://deno.land/x/hono@v3.11.7/middleware.ts";

const app = new Hono();

app.use("/*", cors());

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

let books: Book[] = [
  {
    id: "1",
    title: "My first Deno Code",
    author: "Nath",
    year: 2025
  }
];

app.get("/books", (context) => {
  return context.json({
    success: true,
    data: books
  });
});

app.get("/books/:id", (context) => {
  const id = context.req.param("id");
  const book = books.find((b) => b.id === id);

  if (!book) {
    return context.json(
      {
        success: false,
        message: "Book not found"
      },
      404
    );
  }

  return context.json({
    success: true,
    data: book
  });
});

app.post("/books", async (context) => {
  try {
    const body = await context.req.json();
    const newBook: Book = {
      id: crypto.randomUUID(),
      title: body.title,
      author: body.author,
      year: body.year
    };

    books.push(newBook);

    return context.json(
      {
        success: true,
        data: newBook
      },
      201
    );
  } catch (_error) {
    return context.json(
      {
        success: false,
        message: "Invalid request body"
      },
      400
    );
  }
});

app.put("/books/:id", async (context) => {
  try {
    const id = context.req.param("id");
    const body = await context.req.json();

    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      return context.json(
        {
          success: false,
          message: "Book not found"
        },
        404
      );
    }

    const updatedBook: Book = {
      id,
      title: body.title,
      author: body.author,
      year: body.year
    };

    books[bookIndex] = updatedBook;

    return context.json({
      success: true,
      data: updatedBook
    });
  } catch (_error) {
    return context.json(
      {
        success: false,
        message: "Invalid request body"
      },
      400
    );
  }
});

app.delete("/books/:id", (context) => {
  const id = context.req.param("id");
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    return context.json(
      {
        success: false,
        message: "Book not found"
      },
      404
    );
  }

  books = books.filter((b) => b.id !== id);

  return context.json({
    success: true,
    message: "Book deleted successfully"
  });
});

// Starting our server
Deno.serve(
  {
    port: 8000
  },
  app.fetch
);
