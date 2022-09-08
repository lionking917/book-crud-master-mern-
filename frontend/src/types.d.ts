import React from "react";

export interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  roles: string[]
}

export type UserLogin = Pick<User, "email"> & { password: string };
export type UserRegister = Pick<User, "username" | "email"> & { password: string, roles: string[] }
export type UserRegisterFormik = Pick<User, "username" | "email"> & { password: string, confirmPassword: string, roles: string[] }

export interface Book {
  _id: string;
  user: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface InputProps {
  htmlFor: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void> | Promise<FormikErrors<{ username: string; email: string; password: string; confirmPassword: string; }>>;
  type: string;
  error: string | undefined;
}

export interface SelectOption {
  name: string;
  value: string;
}