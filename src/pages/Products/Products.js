import { useEffect, useState } from 'react';
import { Link } from 'react-router';
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

      <img src={texture} alt="texture" className={styles.texture} />

      <div className={styles.productBorder}>
      <h1>Product List</h1>

      <div>
      </div>

      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
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
      </div>
    </div>
  );
}

export default Products;