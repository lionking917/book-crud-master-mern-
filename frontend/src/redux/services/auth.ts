import axios from "axios";
import { User, UserLogin, UserRegister } from "../../types";

async function login(userData: UserLogin): Promise<User> {
  const { data } = await axios.post<User>(`${process.env.REACT_APP_BASE_API_URL}/api/users/login`, userData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

async function register(
  userData: UserRegister
) {
  const { data } = await axios.post<User>(`${process.env.REACT_APP_BASE_API_URL}/api/users/register`, userData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

async function logout() {
  localStorage.removeItem("user");
}

export const authService = {
  login,
  logout,
  register,
};
