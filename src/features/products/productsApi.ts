import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => 'products',
    }),

    getProductById: builder.query<any, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
