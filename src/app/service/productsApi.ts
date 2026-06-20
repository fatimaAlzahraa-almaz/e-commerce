import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface allProductsProps {
  skip: string;
  sort: string;
  order: string;
}
export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  keepUnusedDataFor: 1800,
  refetchOnMountOrArgChange: 1800,
  endpoints: (build) => ({
    getAllProducts: build.query<any, allProductsProps>({
      query: ({ skip, sort, order }) =>
        `products?limit=30&skip=${skip}&sortBy=${sort}&order=${order}`,
    }),
    getCategories: build.query<any, void>({
      query: () => "products/category-list",
    }),
    getProductsByCategory: build.query<any, string>({
      query: (category: string) => `products/category/${category}`,
    }),
    getSearchedProducts: build.query<any, string>({
      query: (product: string) => `products/search?q=${product}&limit=30`,
    }),
    getProductInfo: build.query<any, string>({
      query: (id) => `https://dummyjson.com/products/${id}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetSearchedProductsQuery,
  useGetProductInfoQuery,
} = productsApi;
