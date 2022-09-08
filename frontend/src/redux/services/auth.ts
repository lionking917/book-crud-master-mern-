import axios from "axios";
import { toast } from "react-toastify";
import { User, UserLogin, UserRegister } from "../../types";

async function login(userData: UserLogin): Promise<User|null> {
  try {
    const { data } = await axios.post<User>(`${process.env.REACT_APP_BASE_API_URL}/api/users/login`, userData);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (err: any) {
    toast(err.response.data);
    throw new Error(err);
  }
}

async function register(
  userData: UserRegister | null
) {
  try {
    const { data } = await axios.post<User>(`${process.env.REACT_APP_BASE_API_URL}/api/users/register`, userData);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (err: any) {
    toast(err.response.data);
    throw new Error(err);
  }
}

async function logout() {
  localStorage.removeItem("user");
}

export const authService = {
  login,
  logout,
  register,
};
