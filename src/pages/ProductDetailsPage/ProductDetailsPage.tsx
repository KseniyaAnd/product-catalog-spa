import { useParams, Link } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../features/products/productsApi';

export default function ProductDetailsPage() {
  const { id } = useParams();

  const productId = Number(id);
  const { data, isLoading, isError } = useGetProductByIdQuery(productId);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Product not found</div>;

  return (
    <div className="product-details">
      <Link to="/products">← Back to products</Link>

      <h1>{data.title}</h1>
      <img src={data.thumbnail} alt={data.title} />
      <p>{data.description}</p>
      <p>Price: ${data.price}</p>
      {data.brand && <p>Brand: {data.brand}</p>}
      {data.category && <p>Category: {data.category}</p>}
    </div>
  );
}
