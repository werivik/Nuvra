import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import texture from '/media/leavesshadow.png';
import { useShoppingCart } from "../ShoppingCart/ShoppingCart";

import emptyStar from "../../../media/ratings/emptystar.png";
import halfStar from "../../../media/ratings/halfstar.png";
import fullStar from "../../../media/ratings/fullstar.png";

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

  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = (rating % 1 >= 0.5) ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push(fullStar);
    for (let i = 0; i < halfStars; i++) stars.push(halfStar);
    for (let i = 0; i < emptyStars; i++) stars.push(emptyStar);

    return stars;
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
              <div className={styles.rating}>
                <div className={styles.stars}>
                  {getStars(product.rating).map((star, index) => (
                    <img key={index} src={star} alt="star" className={styles.ratingStar} />
                  ))}
                </div>
              </div>
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

