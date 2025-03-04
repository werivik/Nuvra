import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../ShoppingCart/ShoppingCart";
import styles from "./Shipping.module.css";
import texture from '../../../media/leavesshadow.png';

export default function Shipping() {
  const navigate = useNavigate();
  const { cartItems } = useShoppingCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    postalCode: "",
    address: "",
    cardHolder: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cartItems.length > 0) {
      const price = cartItems.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);
      setTotalPrice(price);
    }
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.match(/^\d{4,6}$/)) newErrors.postalCode = "Invalid postal code";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.cardHolder.trim()) newErrors.cardHolder = "Cardholder name is required";
    if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = "Card number must be 16 digits";
    if (!formData.expirationMonth || !formData.expirationYear) newErrors.expirationDate = "Expiration date is required";
    if (!formData.cvc.match(/^\d{3}$/)) newErrors.cvc = "CVC must be 3 digits";

    if (formData.expirationMonth && formData.expirationYear) {
      const isValid = validateExpirationDate(formData.expirationMonth, formData.expirationYear);
      if (!isValid) newErrors.expirationDate = "Invalid expiration date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("checkout");
    }
  };

  const getMonths = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString().padStart(2, "0");
      return { value: month, label: month };
    });
  };

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, i) => {
      const year = (currentYear + i).toString().slice(-2);
      return { value: year, label: year };
    });
  };

  const validateExpirationDate = (month, year) => {
    const currentDate = new Date();
    const selectedDate = new Date(`20${year}`, month - 1);
    return selectedDate >= currentDate;
  };

  const handleExpirationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExpirationBlur = () => {
    const isValid = validateExpirationDate(formData.expirationMonth, formData.expirationYear);
    setErrors((prevErrors) => ({
      ...prevErrors,
      expirationDate: isValid ? "" : "Invalid expiration date",
    }));
  };

  return (
    <div className={styles.shippingSection}>
        <div className={styles.textureimage}>
            <img src={texture} alt="texture" className={styles.texture} />
        </div>
        <div className={styles.shippingBorder}>
            
            <form onSubmit={handleSubmit} className={styles.shippingForm}>

            <h1>Order Confirmation</h1>

                <div className={styles.nameForm}>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
        </div>
                </div>

                <div className={styles.countryForm}> 
        <div className={styles.formGroup}>
          <label>Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
          {errors.country && <span className={styles.error}>{errors.country}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
          {errors.city && <span className={styles.error}>{errors.city}</span>}
        </div>
                </div>

                <div className={styles.addressForm}>
                    <div className={styles.formGroup}>
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    {errors.address && <span className={styles.error}>{errors.address}</span>}
                </div>

        <div className={styles.formGroup}>
          <label>Postal Code</label>
          <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className={styles.postalCode} maxLength="4"/>
          {errors.postalCode && <span className={styles.error}>{errors.postalCode}</span>}
        </div>
                </div>

                <h2>Payment Details</h2>

                <div className={styles.cardRow1}> 
                    <div className={styles.formGroup}>
                        <label>Cardholder Name</label>
                        <input type="text" name="cardHolder" value={formData.cardHolder} onChange={handleChange} />
                        {errors.cardHolder && <span className={styles.error}>{errors.cardHolder}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Expiration Date</label>
                        <div className={styles.expirationDate}>
                            <select
                                name="expirationMonth"
                                value={formData.expirationMonth}
                                onChange={handleExpirationChange}
                                onBlur={handleExpirationBlur}
                            >
                            <option value="">MM</option>
                                {getMonths().map((month) => (
                                <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                            ))}
                            </select>

                            <select
                                name="expirationYear"
                                value={formData.expirationYear}
                                onChange={handleExpirationChange}
                                onBlur={handleExpirationBlur}
                            >
                            <option value="">YY</option>
                                {getYears().map((year) => (
                                <option key={year.value} value={year.value}>
                                {year.label}
                            </option>
                            ))}
                            </select>
                        </div>
                        {errors.expirationDate && <span className={styles.error}>{errors.expirationDate}</span>}
                    </div>
                </div>

                <div className={styles.cardRow2}>
                    <div className={styles.formGroup}>
                        <label>Card Number</label>
                        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} maxLength="16" />
                        {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>CVC</label>
                        <input type="text" name="cvc" value={formData.cvc} onChange={handleChange} maxLength="3" className={styles.cvc} />
                        {errors.cvc && <span className={styles.error}>{errors.cvc}</span>}
                    </div>
                </div>

                <div className={styles.submitBorder}>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </div>

            </form>

            <div className={styles.productList}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className={styles.cartList}>
              <p className={styles.totalPrice}><strong>Total Price: </strong>$ {totalPrice.toFixed(2)}</p>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <img src={item.image.url} alt={item.title} width={100} />
                  <div className={styles.productInfo}>
                    <h4>{item.title}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${(item.discountedPrice * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
    </div>
  );
}