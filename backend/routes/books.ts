import { Router, NextFunction } from "express";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from "../controllers/books";
import protectedRoute from "../middleware/auth";
import { User } from "../types";

const router: Router = Router();

router.get(
  "/",
  (req: any & { user: User | null }, res, next: NextFunction) =>
    protectedRoute(req, res, next),
    getBooks
);
router.post(
  "/create",
  (req: any & { user: User | null }, res, next: NextFunction) =>
    protectedRoute(req, res, next),
  createBook
);
router.put(
  "/update/:id",
  (req: any & { user: User | null }, res, next: NextFunction) =>
    protectedRoute(req, res, next),
  updateBook
);
router.delete(
  "/delete/:id",
  (req: any & { user: User | null }, res, next: NextFunction) =>
    protectedRoute(req, res, next),
  deleteBook
);

export default router;
