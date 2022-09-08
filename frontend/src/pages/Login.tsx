import { useCallback } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/slices/auth";
import { UserLogin } from "../types";

function Login() {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(
    (state) => state.auth
  );

  const handleOnSubmit = (values: UserLogin) => {
    dispatch(login({
      email: values.email,
      password: values.password,
    })).then((response: any) => {
      if (response.error) {
        formik.resetForm();
      } else {
        navigate("/");
      }
    });
  };

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email required'),
    password: yup.string().min(6, 'Password must 6 letters at least').required('Password required'),
  });

  const formik = useFormik<UserLogin>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: handleOnSubmit,
  });

  const setInputValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      formik.setValues({
        ...formik.values,
        [e.target.name]: e.target.value,
      }),
    [formik]
  );

  return (
    <main className="max-w-xl mx-auto py-8">
      <h2 className="text-center text-3xl font-medium my-3">
        Login
      </h2>
      <form onSubmit={formik.handleSubmit} className="pt-4 space-y-3">
        <Input 
          htmlFor="email"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={setInputValue}
          type="text"
          error={formik.touched.email ? formik.errors.email : ''}
        />
        <Input 
          htmlFor="password"
          label="Password"
          name="password"
          value={formik.values.password}
          onChange={setInputValue}
          type="password"
          error={formik.touched.password ? formik.errors.password : ''}
        />
        <button type="submit" className="flex-grow bg-gray-800 text-white w-full py-1 hover:bg-gray-900">
          {isLoading ? (
            <>
              <Spinner height="h-4" width="w-4" /> Loading...
            </>
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
    </main>
  );
}

export default Login;
