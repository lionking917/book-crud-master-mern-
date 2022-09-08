import { useCallback } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Multiselect from 'multiselect-react-dropdown';
import * as yup from "yup";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { register } from "../redux/slices/auth";
import { UserRegisterFormik, SelectOption } from "../types";

function Register(this: any) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const navigate: NavigateFunction = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().min(3, 'Username must 3 letters at least').required('Username required'),
    email: yup.string().email('Invalid email').required('Email required'),
    password: yup.string().min(6, 'Password must 6 letters at least').required('Password required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password required')
  });

  const handleOnSubmit = (values: UserRegisterFormik) => {
    dispatch(register({
      username: values.username,
      email: values.email,
      password: values.password,
      roles: values.roles
    })).then((response: any) => {
      if (response.error) {
        formik.resetForm();
      } else {
        navigate("/");
      }
    });
  };

  const formik = useFormik<UserRegisterFormik>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      roles: []
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

  const onSelect = (selectedList: SelectOption[], selectedItem: SelectOption) => {
    formik.setValues({
      ...formik.values,
      'roles': selectedList.map(item => item.value)
    });
  }

  const onRemove = (selectedList: SelectOption[], removedItem: SelectOption) => {
    formik.setValues({
      ...formik.values,
      'roles': selectedList.map(item => item.value)
    });
  }

  return (
    <main className="max-w-xl mx-auto py-8">
      <h2 className="text-center text-3xl font-medium my-3">
        Register
      </h2>
      <form onSubmit={formik.handleSubmit} className="pt-4 space-y-3">
        <Input 
          htmlFor="username"
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={setInputValue}
          type="text"
          error={formik.touched.username ? formik.errors.username : ''}
        />
        <Input 
          htmlFor="email"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={setInputValue}
          type="email"
          error={formik.touched.email ? formik.errors.email : ''}
        />
        <Input 
          htmlFor="password"
          label="Passowrd"
          name="password"
          value={formik.values.password}
          onChange={setInputValue}
          type="password"
          error={formik.touched.password ? formik.errors.password : ''}
        />
        <Input 
          htmlFor="confirmPassword"
          label="Confirm Passowrd"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={setInputValue}
          type="password"
          error={formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
        />
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="roles"
            className="block text-base font-medium leading-5 text-gray-700">
            Roles
          </label>
          <Multiselect
            options={[
              {name: 'CREATOR', value: 'CREATOR'}, 
              {name: 'VIEWER', value: 'VIEWER'},
              {name: 'VIEW_ALL', value: 'VIEW_ALL'},
            ]}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
          />
        </div>
        <button type="submit" className="flex-grow bg-gray-800 text-white w-full py-1 hover:bg-gray-900">
          {isLoading ? (
            <>
              <Spinner height="h-4" width="w-4" /> Loading...
            </>
          ) : (
            <span>Register</span>
          )}
        </button>
      </form>
    </main>
  );
}

export default Register;
