import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../pages/ShoppingCart/ShoppingCart";
import styles from "./Header.module.css";
import shoppingBag from '/media/icons/shoppingbag.png';
import openMenu from '/media/icons/openmenu.png';
import defaultMenu from '/media/icons/defaultmenu.png';

function Header() {
  const { getTotalItems } = useShoppingCart();
  const totalItems = getTotalItems();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add(styles.noScroll);
      document.body.classList.add(styles.blurBackground);
    } 
    
    else {
      document.body.classList.remove(styles.noScroll);
      document.body.classList.remove(styles.blurBackground);
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

        <div className={styles.menuIcon} onClick={toggleMenu}>
          <img src={menuOpen ? openMenu : defaultMenu} alt="Menu" />
        </div>

        <Link to="/" className={styles.logo2}>Nuvra</Link>

        <ul className={`${styles.responsiveMenu} ${menuOpen ? styles.showMenu : ""}`}>
          <li className={styles.responsiveLinks}> 
            <Link to="/" className={styles.respoLink}>Home</Link>
            <Link to="/products" className={styles.respoLink}>Products</Link>
            <Link to="/ShoppingCart" className={styles.respoLink}>
              <div className={styles.respoCart}>
                <span>Shopping Cart</span>
                <p style={{ opacity: totalItems > 0 ? 1 : 0 }}>{totalItems}</p>
                <img src={shoppingBag} alt="Shopping Bag" className={styles.cart} />
              </div>
            </Link>
            <Link to="/Contact" className={styles.respoLink}>Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

