import { Link } from "react-router-dom";
import { useShoppingCart } from "../../pages/ShoppingCart/ShoppingCart";
import styles from "./Header.module.css";
import shoppingBag from '/media/icons/shoppingBag.png';

function Header() {
  const { getTotalItems } = useShoppingCart();
  const totalItems = getTotalItems();

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.menu}>
          <li className={styles.leftside}><Link to="/Contact">Contact Us</Link></li>
          <Link to="/" className={styles.logo}>Nuvra</Link>
          <li className={styles.rightside}>
            <Link to="/products">Products</Link>
            <div className={styles.rightsidecart}> 
              <Link to="/ShoppingCart">
                <p style={{ opacity: totalItems > 0 ? 1 : 0 }}>{totalItems}</p>
                <img src={shoppingBag} alt="Shopping Bag" className={styles.cart} />
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
