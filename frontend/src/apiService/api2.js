// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const productApi = createApi({
//   reducerPath: 'products',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/products' }),
//   endpoints: (builder) => ({
//     createProduct: builder.mutation({
//       query: (productData) => ({
//         url: 'create',
//         method: 'POST',
//         body: productData,
//         headers: {
//           'Content-type': 'application/json',
//         },
//       }),
//     }),
//     getProducts: builder.query({
//       query: (endpoints) => `$(endpoints)`,
//     }),
//     updateProduct: builder.mutation({
//       query: ({ id, product }) => ({
//         url: `${id}`,
//         method: 'PATCH',
//         body: { product },
//       }),
//     }),
//     deleteProduct: builder.mutation({
//       query: ({ id }) => ({
//         url: `${id}`,
//         method: 'DELETE',
//       }),
//     }),
//   }),
// });

// export const {
//   useCreateProductMutation,
//   useGetProductQuery,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } = productApi;
