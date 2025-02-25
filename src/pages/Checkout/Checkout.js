import { useState, useEffect } from "react";
import { useShoppingCart } from "../../pages/ShoppingCart/ShoppingCart";
import { useNavigate } from "react-dom";
import styles from './Checkout.module.css';
import successIcon from '/media/icons/success.png';

export default function CheckoutPage() {
  const { cartItems, getTotalItems, clearCart } = useShoppingCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState([]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const price = cartItems.reduce((total, item) => {
        return total + (item.discountedPrice * item.quantity);
      }, 0);
      setTotalPrice(price);
      
      setPurchasedItems(cartItems);
      clearCart();
    }
  }, [cartItems]);

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutBorder}>
        <img src={successIcon} alt="Success Icon" className={styles.sucessIcon} />
        <h1>Success</h1>
        <p>The Checkout Process has been a Success! You can see all your newly purchased items below.</p>

        <div className={styles.cartSummary}>
          <p><strong>Total Items:</strong> {purchasedItems.length}</p>
          <p><strong>Total Price:</strong> $ {totalPrice.toFixed(2)}</p>
        </div>

        {purchasedItems.length === 0 ? (
          <p>Your order is empty. Please add items to your cart before proceeding to checkout.</p>
        ) : (
          <div className={styles.productSection}>
            <h3>Your Order</h3>
            <ul className={styles.cartList}>
              {purchasedItems.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <img src={item.image.url} alt={item.title} width={100} />
                  <div className={styles.productInfo}>
                    <h4>{item.title}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>$ {(item.discountedPrice * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
