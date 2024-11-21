import React, { useState } from 'react';
import styles from './SignUpInForm.module.css';
import { useDispatch } from 'react-redux';
import { signIn } from './signInSlice'; 

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signIn(formData)); // Assuming signIn action handles login
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h1>Sign In</h1>
        <p>Welcome back to the Book Library!</p>
        <form onSubmit={handleSubmit}>
          {['username', 'password'].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                className={`${styles.formControl} form-control`}
                id={field}
                placeholder={`Enter your ${field}`}
                value={(formData as any)[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit" className={`${styles.btnPrimary} btn btn-primary w-100`}>
            Sign In
          </button>
          <div className={styles.loginLink}>
            Don't have an account? <a href="./signup">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
