export type BasicUserData = {
  email: string;
  phoneNumber: string;
  username: string;
};

export type RigthsData = {
  field: string;
  value: string;
};

export type UserRegistration = {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
};

export type UserLogin = {
  login: string;
  password: string;
};

export type QuantityInformation = {
  all: number;
  completed: number;
  inWork: number;
};

export type Category = "all" | "inWork" | "done";

export type Todo = {
  created: Date;
  id: number;
  isDone: boolean;
  title: string;
};

export type ProfileData = {
  date: string;
  email: string;
  id: number;
  isAdmin: boolean;
  isBlocked: boolean;
  phoneNumber: string;
  username: string;
};

export interface DataType {
  date: string;
  email: string;
  id: number;
  isAdmin: boolean;
  isBlocked: boolean;
  phoneNumber: string;
  username: string;
}
