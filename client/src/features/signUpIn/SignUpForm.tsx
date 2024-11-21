import React, { useState } from 'react';
import styles from './SignUpForm.module.css';
import { useDispatch } from 'react-redux';
import { signUp } from './signUpSlice';
import progressImage from '../../img/a.png';
const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
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
    dispatch(signUp(formData));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h1>Sign up</h1>
        <p>Join the Book Library community today!</p>
        <form onSubmit={handleSubmit}>
          {['fullName', 'email', 'username', 'password', 'confirmPassword'].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1).replace('confirmPassword', 'Confirm')}
              </label>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                className={`${styles.formControl} form-control`}
                id={field}
                placeholder={`Enter your ${field}`}
                value={(formData as any)[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit" className={`${styles.btnPrimary} btn btn-primary w-100`}>
            Join
          </button>
          <div className={styles.loginLink}>
            Already a member? <a href="./signin">Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUpForm;