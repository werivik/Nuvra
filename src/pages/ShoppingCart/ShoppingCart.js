import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShoppingCart.module.css';
import texture from '../../../media/leavesshadow.png';
import trashcan from '../../../media/icons/trashicon.png';
import arrowIcon from '../../../media/icons/arrow.png';

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export default function ShoppingCart() {
  const { cartItems, updateQuantity, removeFromCart, getTotalItems } = useShoppingCart();
  const [productsData, setProductsData] = useState([]);
  const [isRightSideOpen, setIsRightSideOpen] = useState(false);
  const navigate = useNavigate();

  const toggleRightSide = () => {
    setIsRightSideOpen(!isRightSideOpen);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const detailsPromises = cartItems.map(item =>
          fetch(`https://v2.api.noroff.dev/online-shop/${item.id}`)
            .then(res => res.json())
            .then(data => ({
              ...data.data,
              quantity: item.quantity
            }))
        );
        const products = await Promise.all(detailsPromises);
        setProductsData(products);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchProductDetails();
    }
  }, [cartItems]);

  const totalPrice = productsData.reduce((total, product) =>
    total + (product.discountedPrice * (product.quantity || 1)), 0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className={styles.shoppingSection}>
      <div className={styles.shoppingBorder}>
        <div className={`${styles.leftSide} ${isRightSideOpen ? styles.blur : ""}`}>
          <div className={styles.textureimage}>
            <img src={texture} alt="texture" className={styles.texture} />
          </div>
          <h1>Shopping Cart</h1>
          <button className={styles.backButton} onClick={() => navigate(-1)}>Go Back</button>

          {cartItems.length === 0 ? (
            <p className={styles.cartinfotext}>Your shopping cart is empty.</p>
          ) : (
            <div>
              <p>Total Items: {getTotalItems()}</p>
              <ul className={styles.cartList}>
                {productsData.map((product, index) => {
                  const cartItem = cartItems.find(item => item.id === product.id);
                  const quantityInCart = cartItem ? cartItem.quantity : 1;

                  return (
                    <li key={index} className={styles.productCard}>
                      <img src={product.image.url} alt={product.title} width={100} />
                      <div className={styles.titleDesc}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                      </div>
                      <div className={styles.quantityControl}>
                        {quantityInCart > 1 && (
                          <button
                            className={styles.quantityMinusButton}
                            onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                          >
                            -
                          </button>
                        )}
                        <select
                          value={quantityInCart}
                          onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                          className={styles.quantityDropdown}
                        >
                          {[...Array(quantityInCart + 5)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                        <button
                          className={styles.quantityPlusButton}
                          onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className={styles.productPrice}>
                        $ {(product.discountedPrice * quantityInCart).toFixed(2)}
                      </p>
                      <div className={styles.trashcan} onClick={() => removeFromCart(product.id)}>
                        <img src={trashcan} alt="Remove item" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className={`${styles.rightSide} ${isRightSideOpen ? styles.showRightSide : ""}`}>
          <div className={styles.rightSideArrow} onClick={toggleRightSide}>
            <img src={arrowIcon} alt="Arrow Icon" className={styles.arrowIcon} />
          </div>
          <h3>Cart Summary</h3>
          <div className={styles.priceSummary}>
            <p><strong>Total Discount:</strong> $0.00</p>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
          </div>
          {cartItems.length > 0 && (
            <>
              <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout</button>
              <p className={styles.costumerRights}>
                <strong>Consumer Rights:</strong> You have the right to cancel your purchase within 14 days without providing a reason. For more details, refer to our terms and conditions.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
