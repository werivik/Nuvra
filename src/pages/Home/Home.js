import { Link } from 'react-dom';
import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import texture from '/media/leavesshadow.png';
import magnifier from '/media/icons/magnifier.png';

import bannerImage1 from '/media/collage/leatherbags.jpeg';
import bannerImage2 from '/media/collage/blackshoes.jpeg';
import bannerImage3 from '/media/collage/teapots.jpeg';
import bannerImage4 from '/media/collage/coat.jpeg';

function Home() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('https://v2.api.noroff.dev/online-shop')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setFilteredProducts(data.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, filteredProducts.length));
  };

  return (
    <div>
      <div className={styles.textureimage}>
        <img src={texture} alt="texture" className={styles.texture} />
      </div>

      <div className={styles.topbanner}>
          <div className={styles.bannerborder}>
            <div className={styles.collageimages}>
              <div className={styles.collageLeft}>
                <div className={styles.collageTop}>
                  <img src={bannerImage1} alt="Whatever" className={styles.collageImage} />
                  <img src={bannerImage2} alt="Whatever" className={styles.collageImage} />
                </div>
                <div className={styles.collageBottom}>
                  <img src={bannerImage3} alt="Whatever" className={styles.collageImage} />
                </div>
              </div>
              <div className={styles.collageRight}>
                <img src={bannerImage4} alt="Whatever" className={styles.collageImage} />
              </div>
            </div>
            <div className={styles.bannercontent}>
              <h1>Nuvra</h1>
              <Link 
  to="#" 
  className={styles.explorebutton} 
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("productContent").scrollIntoView({ behavior: "smooth" });
  }}
>
  Explore Products
</Link>
            </div>
          </div>
      </div>

      <div className={styles.homeContent} id='productContent'>
        <div className={styles.productSection}>
          <div className={styles.productBorder}>
            <div className={styles.titleFilter}>
            <h2>Product List</h2>
              <form className={styles.searchBar}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                />
                <img src={magnifier} alt="Search Icon" className={styles.magnifier} />
              </form>
            </div>

            {filteredProducts.length > 0 ? (
              <ul className={styles.productGrid}>
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <li key={product.id} className={styles.productCard}>
                    <Link to={`/products/${product.id}`}>
                      <img src={product.image.url} alt={product.title} />
                      <h2 className={styles.productTitle}>{product.title}</h2>
                      <p className={styles.productPrice}>$ {product.discountedPrice.toFixed(2)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found.</p>
            )}

            {visibleCount < filteredProducts.length && (
              <button onClick={loadMore} className={styles.loadMoreButton}>
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;