import { Link } from 'react-router-dom';
import { Product } from '../../features/products/productsApi';

type Props = {
  product: Product;
  onDelete: (id: number) => void;
  deleting?: boolean;
};

export function ProductCard({ product, onDelete, deleting }: Props) {
  return (
    <article>
      <Link to={`/products/${product.id}`} className="product-card__link">
        <img
          className="product-card__image"
          src={product.thumbnail}
          alt={product.title}
        />
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">${product.price}</p>
      </Link>

      <button
        type="button"
        className="product-card__delete"
        onClick={() => onDelete(product.id)}
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </article>
  );
}
