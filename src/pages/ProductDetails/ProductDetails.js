import { useNavigate } from "react-dom";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import texture from '/media/leavesshadow.png';
import { useShoppingCart } from "../ShoppingCart/ShoppingCart";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useShoppingCart();
  const [isClicked, setIsClicked] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    setIsClicked(true);
    addToCart(product);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 200);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 1000);
  };

  return (
    <div className={styles.productSection}>
      <img src={texture} alt="texture" className={styles.texture} />

      <div className={styles.productBorder}>
        <div className={styles.details}>
          <img className={styles.image} src={product.image.url} alt={product.title} />
          <div className={styles.info}>
            <div className={styles.topinfo}>
              <h1>{product.title}</h1>
              <p className={styles.category}><strong>Category:</strong> {product.tags.join(', ')}</p>
                <button className={styles.backButton} onClick={() => navigate(-1)}>Go Back</button>
            </div>
            <div className={styles.bottominfo}>
              <p className={styles.description}><strong>Description:</strong> {product.description}</p>
              <p className={styles.rating}><strong>Rating:</strong> {product.rating}</p>
              <p className={styles.price}><strong>Price:</strong> $ {product.discountedPrice.toFixed(2)}</p>
            </div>
            <div className={styles.buyButton}>
              <button 
                onClick={handleClick} 
                className={isClicked ? styles.clicked : ""}
              >
                Buy
              </button>
              {showSuccessMessage && (
                <p className={styles.successMessage}>Added to cart!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
