import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Products.module.css';
import texture from '/media/leavesshadow.png';


function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
      .then((data) => {
        console.log("API Response:", data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  console.log("Products State:", products);
  
  return (
        <div className={styles.productSection}>
                <div className={styles.textureimage}>
                  <img src={texture} alt="texture" className={styles.texture} />
                </div>
          <div className={styles.productBorder}>
            <div className={styles.titleFilter}>
              <h1>Product List</h1>
              <form onSubmit={handleSearchSubmit} className={styles.searchBar}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                /> <img src={magnifier} alt="Magnifying Glass Icon" className={styles.magnifier} />
                {suggestion && <span className={styles.suggestion} style={{ opacity: 0.5 }}>{suggestion}</span>}
              </form>
            </div>
            {filteredProducts.length > 0 ? (
              <ul>
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <li key={product.id} className={styles.productCard}>
                    <Link to={`/products/${product.id}`}>
                      <img src={product.image} alt={product.title} />
                      <h2 className={styles.productTitle}>{product.title}</h2>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found.</p>
            )}
            {visibleCount < filteredProducts.length && (
              <button onClick={loadMore} className={styles.loadMoreButton}>Load More</button>
            )}
          </div>
        </div>
  );
}

export default Products;