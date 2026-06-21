import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand?: string;
  category?: string;
  thumbnail: string;
  images?: string[];
  stock?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductInput {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  brand?: string;
  category?: string;
  stock?: number;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => 'products',
      providesTags: (result) => {
        if (result) {
          const tags = [{ type: 'Products' as const, id: 'LIST' }];
          for (let i = 0; i < result.products.length; i++) {
            tags.push({
              type: 'Products' as const,
              id: result.products[i].id.toString(),
            });
          }
          return tags;
        } else {
          return [{ type: 'Products' as const, id: 'LIST' }];
        }
      },
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => 'products/' + id,
      providesTags: (_result, _error, id) => {
        return [{ type: 'Products' as const, id: id.toString() }];
      },
    }),

    addProduct: builder.mutation<Product, ProductInput>({
      query: (body) => {
        console.log('adding product', body);
        return {
          url: 'products/add',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [{ type: 'Products' as const, id: 'LIST' }],
    }),

    deleteProduct: builder.mutation<{ id: number; isDeleted: boolean }, number>(
      {
        query: (id) => {
          console.log('deleting product with id', id);
          return {
            url: `products/${id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: [{ type: 'Products' as const, id: 'LIST' }],
      },
    ),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productsApi;
