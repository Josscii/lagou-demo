import api from "./api";

export const signin = (email: string, password: string) =>
  api.post("/signin", { email, password });

export const signout = () => api.get("/signout");

export const signup = (name: string, email: string, password: string) =>
  api.post("/signup", { name, email, password });

export interface History {
  _id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  transaction_id: string;
  amount: number;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  role: number;
  history: History[];
}

export const getUserInfo = (id: string): Promise<UserInfo> =>
  api.get(`/user/${id}`).then((res) => res.data);

export const updateUserInfo = (
  id: string,
  name?: string,
  email?: string,
  password?: string
) => api.put(`/user/${id}`, { name, email, password });
