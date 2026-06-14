import { FormEvent, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../features/products/productsApi';

export default function ProductsPage() {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnail(e.target.value);
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();

    await addProduct({
      title,
      price: Number(price),
      description,
      thumbnail,
    });

    setTitle('');
    setPrice('');
    setDescription('');
    setThumbnail('');
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load products</div>;

  return (
    <div className="products-page">
      <section className="products-page__form">
        <h1>Products</h1>

        <form onSubmit={handleAddProduct}>
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
          />
          <input
            value={price}
            onChange={handlePriceChange}
            placeholder="Price"
            type="number"
          />
          <input
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
          />
          <input
            value={thumbnail}
            onChange={handleThumbnailChange}
            placeholder="Thumbnail URL"
          />

          <button type="submit" disabled={isAdding}>
            {isAdding ? 'Adding...' : 'Add product'}
          </button>
        </form>
      </section>

      <section className="products-page__list">
        {data?.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
            deleting={isDeleting}
          />
        ))}
      </section>
    </div>
  );
}
