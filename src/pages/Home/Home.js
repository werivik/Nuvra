import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import bannerImage1 from '/media/collage/leatherbags.jpeg';
import bannerImage2 from '/media/collage/blackshoes.jpeg';
import bannerImage3 from '/media/collage/teapots.jpeg';
import bannerImage4 from '/media/collage/coat.jpeg';
import texture from '/media/leavesshadow.png';
import magnifier from '/media/icons/magnifier.png';

function Home() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const loadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 8, products.length));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value.trim() === "") {
      setSuggestion("");
      return;
    }
  
    const matchedProduct = products.find(product => 
      product.title.toLowerCase().startsWith(value.toLowerCase())
    );
  
    setSuggestion(matchedProduct ? matchedProduct.title.slice(value.length) : "");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (suggestion) {
      setSearchTerm(searchTerm + suggestion);
      setSuggestion("");
    }
  };

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className={styles.textureimage}>
        <img src={texture} alt="texture" className={styles.texture} />
      </div>

      <div className={styles.homeContent}>
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
              <h1>Ecommerce</h1>
              <Link to="/products" className={styles.explorebutton}>Explore Products</Link>
            </div>
          </div>
        </div>

        <div className={styles.productSection}>
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
      </div>
    </div>
  );
}

export default Home;