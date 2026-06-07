import { useGetProductsQuery } from '../../features/products/productsApi';

export default function ProductsPage() {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <h1>Products</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
