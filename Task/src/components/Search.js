import React, { useEffect, useState } from "react";
import styles from './search.module.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Search = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ price: '' });
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  const handleProductSelect = (product) => {
    navigate('/Details', { state: { product } });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => { 
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let filtered=products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filters.price) {
      const [minPrice, maxPrice] = filters.price.split('-').map(Number);
      filtered= products.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }

    setProducts(filtered);
  };

  return (
    <div style={{ margin: '80px' }}>
      <h2>Products</h2>
      <Link to="/Cart">
          <button className={styles.cartbutton}>Cart</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for product"
          value={search}
          onChange={handleSearchChange}
        />
        <select name="price" value={filters.price} onChange={handleFilterChange}>
          <option value="">All Prices</option>
          <option value="0-10">$0 - $10</option>
          <option value="10-20">$10 - $20</option>
          <option value="20-50">$20 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
        </select>
        <button type="submit">Search</button>
      </form>
      <div className={styles.products}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img src={product.image} alt={product.title} onClick={() => handleProductSelect(product)} />
            <p>{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
