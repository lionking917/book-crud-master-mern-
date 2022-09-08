import { useEffect, memo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BookForm from "../components/BookForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { reset } from "../redux/slices/auth";

function Dashborad() {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user && isSuccess) {
      toast.success(message);
    } else if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, user, navigate]);
  return (
    <div className="max-w-4xl mx-auto px-2 py-7">
      <h2 className="text-center text-2xl font-bold mt-7 mb-5">
        Welcome {user?.username}, Start creating your books.{" "}
      </h2>
      <BookForm />
    </div>
  );
}

export default memo(Dashborad);
