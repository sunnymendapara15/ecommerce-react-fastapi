import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <article className="product-card">
    <img src={product.image_url} alt={product.name} loading="lazy" />
    <div>
      <h3>{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-description">{product.description}</p>
    </div>
    <div className="product-footer">
      <strong>${product.price.toFixed(2)}</strong>
      <Link to={`/products/${product.id}`} className="button-link">
        View Details
      </Link>
    </div>
  </article>
);

export default ProductCard;
