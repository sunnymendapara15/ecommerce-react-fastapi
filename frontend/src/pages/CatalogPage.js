import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setStatus({ loading: true, error: null });
      try {
        const data = await fetchProducts();
        if (!isMounted) return;
        setProducts(data);
        setStatus({ loading: false, error: null });
      } catch (error) {
        if (!isMounted) return;
        setStatus({ loading: false, error: error.message });
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (status.loading) {
    return <p>Loading products...</p>;
  }

  if (status.error) {
    return <div className="status-message error">{status.error}</div>;
  }

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <section>
      <h1>Product Catalog</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CatalogPage;
