import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Shipping.module.css";
import texture from '../../../media/leavesshadow.png';

export default function Shipping() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    postalCode: "",
    address: "",
    cardHolder: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  
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
    if (!formData.expirationDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expirationDate = "Use MM/YY format";
    if (!formData.cvc.match(/^\d{3}$/)) newErrors.cvc = "CVC must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("checkout");
    }
  };

  return (
    <div className={styles.shippingSection}>
        <div className={styles.textureimage}>
            <img src={texture} alt="texture" className={styles.texture} />
        </div>
        <div className={styles.shippingBorder}>
        <h1>Order Confirmation</h1>
      <form onSubmit={handleSubmit} className={styles.shippingForm}>
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

        <div className={styles.formGroup}>
          <label>Postal Code</label>
          <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
          {errors.postalCode && <span className={styles.error}>{errors.postalCode}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <span className={styles.error}>{errors.address}</span>}
        </div>

        <h2>Payment Details</h2>

        <div className={styles.formGroup}>
          <label>Cardholder Name</label>
          <input type="text" name="cardHolder" value={formData.cardHolder} onChange={handleChange} />
          {errors.cardHolder && <span className={styles.error}>{errors.cardHolder}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Card Number</label>
          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} maxLength="16" />
          {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Expiration Date (MM/YY)</label>
            <input type="text" name="expirationDate" value={formData.expirationDate} onChange={handleChange} maxLength="5" />
            {errors.expirationDate && <span className={styles.error}>{errors.expirationDate}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>CVC</label>
            <input type="text" name="cvc" value={formData.cvc} onChange={handleChange} maxLength="3" />
            {errors.cvc && <span className={styles.error}>{errors.cvc}</span>}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
        </div>
    </div>
  );
}
