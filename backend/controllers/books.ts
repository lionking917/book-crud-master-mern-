import { Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Books from "../models/books";
import { User, Book } from "../types";

const Roles = {
  CREATOR: 'CREATOR',
  VIEWER: 'VIEWER',
  VIEW_ALL: 'VIEW_ALL'
}

const getBooks = expressAsyncHandler(
  async (req: any & { user: User | null }, res: Response): Promise<void> => {
    let books: Book[] = [];
    if (req.user.roles.includes(Roles.VIEW_ALL)) {
      books = await Books.find();
    } else if (req.user.roles.includes(Roles.VIEWER)) {
      books = await Books.find({ user: req.user._id });
    }

    if (req.query.old) {
      books = books.filter((book: Book) => new Date().getTime() - new Date(book.createdAt).getTime() > 600000);
    } else if (req.query.new) {
      books = books.filter((book: Book) => new Date().getTime() - new Date(book.createdAt).getTime() < 600000);
    }

    res.status(200).send(books);
  }
);

const createBook = expressAsyncHandler(
  async (req: any & { user: User | null }, res): Promise<void> => {
    const { text } = req.body;
    const { _id: id } = req.user;

    try {
      if (!text) {
        res.status(400).send("Text is required");
        throw new Error("Text is required");
      }

      await Books.create({ user: id, text });

      res.send("Book created");
    } catch (err: any) {
      console.log(err as Error);
      res.status(500).send(err.message);
    }
  }
);

const updateBook = expressAsyncHandler(async (req, res): Promise<void> => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400).send("Text is required");
    throw new Error("Text is required");
  }

  const updatedBook = await Books.findByIdAndUpdate(
    id,
    { text },
    { new: true }
  );
  res.send(updatedBook);
});

const deleteBook = expressAsyncHandler(async (req, res): Promise<void> => {
  const { id } = req.params;

  const book = await Books.findByIdAndDelete(id);
  res.send(book);
});

export { getBooks, createBook, updateBook, deleteBook };
