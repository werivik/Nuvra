import { Link } from 'react-dom';
import { useState } from 'react';
import styles from './Contact.module.css';
import texture from '/media/leavesshadow.png';
import image from '/media/images/handtypingoncomputer.jpeg';

function Contact() {
  const [fullName, setFullName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
    } 
    
    else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (fullName.length < 3) validationErrors.fullName = 'Full Name must be at least 3 characters long';
    if (subject.length < 3) validationErrors.subject = 'Subject must be at least 3 characters long';
    if (!email || !/\S+@\S+\.\S+/.test(email)) validationErrors.email = 'Please enter a valid email address';
    if (body.length < 3) validationErrors.body = 'Body must be at least 3 characters long';
    return validationErrors;
  };

  return (
    <div className={styles.contactSection}>

      <div className={styles.textureImage}>
        <img src={texture} alt="texture" className={styles.texture} />
      </div>

    <div className={styles.contactBorder}>
        <div className={styles.leftImage}>
            <img src={image} alt="Hello" className={styles.contactImage} />
        </div>

      <div className={styles.contactContent}>
        <h1>Contact Us</h1>
        
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder='Luke Skywalker'
            />
            {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
          </div>

          <div className={styles.formGroup} id={styles.email}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='example@email-adress.com'
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup} id={styles.subject}>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            {errors.subject && <p className={styles.error}>{errors.subject}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="body">Message</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
            {errors.body && <p className={styles.error}>{errors.body}</p>}
          </div>

          <div className={styles.submitButtonSection}>
          <button type="submit" className={styles.submitButton}>Submit</button>
          </div>
        </form>

        {isSubmitted && (
          <div className={styles.successMessage}>
            <h3>Your message has been submitted successfully!</h3>
            <p>Thank you for reaching out to us. We’ll get back to you soon.</p>
            <Link to="/" className={styles.backButton}>Back to Home</Link>
          </div>
        )}
      </div>
        </div>

    </div>
  );
}

export default Contact;



