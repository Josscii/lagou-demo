import { CartItem } from "../store/cartSlice";
import { store } from "../store/store";
import api from "./api";
import { Category } from "./category";

export interface Product {
  sold: number;
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  quantity: number;
  shipping: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getNewProducts = (): Promise<Product[]> =>
  api
    .get("/products?sortBy=createdAt&order=asc&limit=10")
    .then((res) => res.data);

export const getTopProducts = (): Promise<Product[]> =>
  api.get("/products?sortBy=sold&order=asc&limit=10").then((res) => res.data);

export const searchProducts = (
  keyword: string,
  category: string
): Promise<Product[]> =>
  api
    .get(`/products/search?search=${keyword}&category=${category}`)
    .then((res) => res.data);

export const getProduct = (id: string): Promise<Product> =>
  api.get(`/product/${id}`).then((res) => res.data);

export const getRelatedProduct = (id: string): Promise<Product[]> =>
  api.get(`/products/related/${id}`).then((res) => res.data);

export interface Filters {
  category: string[];
  price: number[];
}

export interface PagedProducts {
  size: number;
  data: Product[];
}

export const filterProducts = (
  skip: number,
  filters: Filters
): Promise<PagedProducts> =>
  api
    .post("/products/filter", {
      skip,
      filters,
      order: "desc",
      limit: 2,
      sortBy: "_id",
    })
    .then((res) => res.data);

export const buy = (cartItem: CartItem[], address: string, amount: number) =>
  api.post("/alipay", {
    totalAmount: amount,
    subject: "订单标题",
    body: "订单描述",
    products: cartItem.map((item) => ({
      count: item.count,
      product: item.product._id,
    })),
    address: address,
    userId: store.getState().user?.user._id,
  });
