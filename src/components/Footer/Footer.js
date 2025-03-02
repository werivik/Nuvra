import styles from './Footer.module.css';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBorder}>

        <div className={styles.footerLeft}>
          <h2>Nuvra </h2>
          <p>Your go-to destination for Quality products at the best prices!</p>
        </div>
        <div className={styles.footerMiddle}>
          <li>
            <Link to="/">Nuvra</Link>
            <Link to="/">Products</Link>
            <Link to="/ShoppingCart">Shopping Bag</Link>
            <Link to="/Contact">Contact Us</Link>
          </li>
        </div>

        <div className={styles.footerRight}>
          <p><strong>Email:</strong> support@ecommerce.com</p>
          <p><strong>Phone:</strong> (+47) 123 45 678</p>
          <p><strong>Adress:</strong> 22B Baker Street</p>
        </div>

        <p className={styles.footerCopy}>&copy; Ecommerce 2025</p>

      </div>
    </footer>
  );
}

export default Footer;