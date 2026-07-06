import { Routes, Route, Link } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-logo">
          Ecommerce Demo
        </Link>
        <nav>
          <Link to="/">Catalog</Link>
          <Link to="/products/1">Sample Checkout</Link>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/products/:productId" element={<CheckoutPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
