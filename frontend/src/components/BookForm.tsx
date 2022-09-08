import { PencilIcon, TrashIcon, ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useState, ChangeEvent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../redux/services/books";
import { Book } from "../types";
import Spinner from "./Spinner";

const Roles = {
  CREATOR: 'CREATOR',
  VIEWER: 'VIEWER',
  VIEW_ALL: 'VIEW_ALL'
}

function BookForm() {
  const [text, setText] = useState("");
  const navigate: NavigateFunction = useNavigate();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const [period, setPeriod] = useState('');
  const { data, refetch, isFetching } = useGetBooksQuery(period);
  const [createBook] = useCreateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [filter, setFilter] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [order, setOrder] = useState(true);

  useEffect(() => {
    refetch();
  }, [user, refetch]);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBook(text);
    setText("");
  };

  useEffect(() => {
    if (data && data.length > 0) {
      if (filter !== '') {
        setFilteredBooks(data?.filter(item => item.text.toLowerCase().includes(filter.toLowerCase())));
      } else {
        setFilteredBooks([...data]);
      }
    } else {
      setFilteredBooks([]);
    }
  }, [data, filter, setFilteredBooks])

  useEffect(() => {
    if (filteredBooks.length > 0) {
      let prevBooks = [...filteredBooks];
      if (order) {
        prevBooks.sort((a: Book, b: Book) => {
          if (a.text > b.text) {
            return 1;
          } else if (a.text < b.text) {
            return -1;
          }
          return 0;
        });
      } else {
        prevBooks.sort((a: Book, b: Book) => {
          if (a.text < b.text) {
            return 1;
          } else if (a.text > b.text) {
            return -1;
          }
          return 0;
        });
      }
      setFilteredBooks(prevBooks);
    }
  }, [order, filteredBooks, setFilteredBooks])

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }

  const handleSort = () => {
    setOrder(!order);
  }

  const handlePeriod = (e: ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
  }

  return (
    <>
      {
        user?.roles.includes(Roles.CREATOR) && 
        <form
          onSubmit={onSubmit}
          className="w-full flex items-center space-x-2"
          action="">
          <input
            className="border outline-none px-4 py-1 border-gray-300 flex-grow focus:ring-2 ring-blue-600 transition-all duration-200"
            type="text"
            placeholder="Add your book..."
            value={text}
            onChange={onInputChange}
          />
          <button className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white px-5 py-1">
            Add book
          </button>
        </form>
      }
      <div className="space-y-2 mt-10 py-2">
        {isLoading || isFetching ? (
          <div className="flex justify-center py-4">
            <Spinner height="h-14" width="w-14" />
          </div>
        ) : (
          <>
            <div className="sm:flex sm:gap-x-2">
              <label className="flex gap-x-2 items-baseline">
                <span className="text-gray-700">Search: </span>
                <input
                  type="text"
                  className="border rounded-md outline-none px-4 py-2 border-gray-300 flex-grow focus:ring-2 ring-blue-600 transition-all duration-200"
                  value={filter}
                  onChange={handleFilter}
                  placeholder={`${filteredBooks.length} records...`}
                />
              </label>
              <select 
                id="default" 
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={period}
                onChange={handlePeriod}
              >
                <option value="normal">Select Period</option>
                <option value="new">Less than 10 mins</option>
                <option value="old">More than 10 mins</option>
              </select>
            </div>
            <div className="mt-4 flex flex-col">
              <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center justify-between cursor-pointer" onClick={handleSort}>
                              Name
                              {
                                order ? 
                                  <ArrowUpIcon className="h-5" />
                                :
                                  <ArrowDownIcon className="h-5" />
                              }
                            </div>
                          </th>
                          <th scope="col" className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created At
                          </th>
                          <th scope="col" className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Updated At
                          </th>
                          <th scope="col" className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                          <th scope="col" className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {
                          filteredBooks.map((item: Book) => (
                            <tr key={item._id}>
                              <td className="px-6 py-4 whitespace-nowrap" role="cell">
                                {item.text}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap" role="cell">
                                {item.createdAt}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap" role="cell">
                                {item.updatedAt}
                              </td>
                              {
                                user?.roles.includes(Roles.CREATOR) && 
                                <td className="px-6 py-4 whitespace-nowrap" role="cell">
                                  <button
                                    onClick={() => navigate(`/books/${item._id}`)}
                                    className="bg-green-600 text-white group-hover:right-10 transition-all duration-200">
                                    <PencilIcon className="h-6" />
                                  </button>
                                </td>
                              }
                              {
                                user?.roles.includes(Roles.CREATOR) && 
                                <td className="px-6 py-4 whitespace-nowrap" role="cell">
                                  <button
                                    onClick={() => {
                                      if (window.confirm('You want to delete book?')) {
                                        deleteBook(item._id)
                                      }
                                    }}
                                    className="bg-red-600 text-white group-hover:right-0 transition-all duration-200">
                                    <TrashIcon className="h-6" />
                                  </button>
                                </td>
                              }
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default BookForm;
