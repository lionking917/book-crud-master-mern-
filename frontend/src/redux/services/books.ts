import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book } from "../../types";
import { RootState } from "../store";

const booksApi = createApi({
  reducerPath: "books",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/api/books`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user!.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], string>({
      query: (type: string) => ({
        url: "/",
        method: "GET",
        params: type ? {[type]: 1} : {},
      }),
      providesTags: ["Book"],
    }),
    createBook: builder.mutation<void, Book["text"]>({
      query: (text) => ({
        url: "/create",
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<void, Book["_id"]>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<void, Pick<Book, "_id" | "text">>({
      query: ({ _id: id, text }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi;

export default booksApi;
