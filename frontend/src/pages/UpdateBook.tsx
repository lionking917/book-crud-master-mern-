import React, { useCallback, useEffect, useState } from "react";
import {
  NavigateFunction,
  Params,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useGetBooksQuery,
  useUpdateBookMutation,
} from "../redux/services/books";
import { Book } from "../types";

function UpdateBook() {
  const [book, setBook] = useState<Book | null>(null);
  const [text, setText] = useState<Book["text"]>("");
  const { id }: Readonly<Params<string>> = useParams();
  const navigate: NavigateFunction = useNavigate();

  const { data } = useGetBooksQuery('normal');
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const fn = useUpdateBookMutation();

  useEffect(() => {
    const book = data?.find((book: Book) => book._id === id);
    setBook(book as Book);
  }, [id, data]);
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateBook({ _id: id, text } as Pick<Book, "_id" | "text">);
    setText("");
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto py-14">
      <form
        onSubmit={onSubmit}
        className="w-full flex items-center space-x-2"
        action="">
        <input
          className="border outline-none px-4 py-1 border-gray-300 flex-grow focus:ring-2 ring-blue-600 transition-all duration-200"
          type="text"
          placeholder="Update your book..."
          defaultValue={book?.text}
          onChange={onInputChange}
        />
        <button className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white px-5 py-1">
          {isLoading ? "Updating" : "Update Book"}
        </button>
      </form>
    </div>
  );
}

export default UpdateBook;
