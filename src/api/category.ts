import api from "./api";

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getCategories = (): Promise<Category[]> =>
  api.get("/categories").then((res) => res.data);
