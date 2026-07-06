import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchProductById, submitCheckout } from '../services/api';

const CheckoutPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    quantity: 1,
    customer_name: '',
    email: '',
    shipping_address: '',
  });

  useEffect(() => {
    if (!productId) {
      navigate('/', { replace: true });
      return;
    }

    let isMounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(productId);
        if (!isMounted) return;
        setProduct(data);
      } catch (fetchError) {
        if (!isMounted) return;
        setError(fetchError.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [productId, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(1, Number(value) || 1) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!product) return;

    setStatus({ type: '', message: '' });
    setError('');

    try {
      const response = await submitCheckout({
        product_id: Number(productId),
        quantity: form.quantity,
        customer_name: form.customer_name.trim(),
        email: form.email.trim(),
        shipping_address: form.shipping_address.trim(),
      });
      setStatus({ type: 'success', message: `${response.message} (Total: $${response.total.toFixed(2)})` });
    } catch (submitError) {
      setStatus({ type: 'error', message: submitError.message });
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <div className="status-message error">{error}</div>;
  }

  return (
    <section>
      <header>
        <h1>Checkout</h1>
        <p>
          <Link to="/" className="secondary-link">
            ← Back to catalog
          </Link>
        </p>
      </header>
      <div className="checkout-panel">
        <div className="checkout-summary">
          <h2>{product?.name}</h2>
          <p className="product-category">{product?.category}</p>
          <p>{product?.description}</p>
          <p>
            <strong>Price:</strong> ${product?.price.toFixed(2)}
          </p>
        </div>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Order Details</h2>
          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            required
          />
          <label htmlFor="customer_name">Full Name</label>
          <input
            id="customer_name"
            name="customer_name"
            type="text"
            placeholder="Jane Doe"
            value={form.customer_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="shipping_address">Shipping Address</label>
          <textarea
            id="shipping_address"
            name="shipping_address"
            placeholder="123 Main St, Anytown"
            value={form.shipping_address}
            onChange={handleChange}
            required
          />
          <div className="checkout-actions">
            <button type="submit" className="primary-button">
              Place order
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutPage;
