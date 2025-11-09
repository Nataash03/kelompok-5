'use client';

import { useState } from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SignupForm.module.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      username: '',
      password: ''
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        window.location.href = '/login';
      } else {
        const error = await response.json();
        alert(error.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        <div className="row align-items-center justify-content-center min-vh-100 py-5">
          <div className="col-lg-5 col-md-6 d-none d-md-flex justify-content-center mb-4 mb-md-0">
            <Image
              src="/juice-shop.png"
              alt="Juice Shop Illustration"
              width={350}
              height={350}
              priority
              className={styles.illustration}
            />
          </div>

          <div className="col-lg-5 col-md-6 col-sm-10">
            <div className={`card border-0 ${styles.formCard}`}>
              <div className="card-body p-4">
                <div className="mb-4">
                  <h1 className={styles.title}>Create Account</h1>
                  <p className={styles.subtitle}>
                    Sudah punya akun?{' '}
                    <a href="/login" className={styles.signInLink}>
                      Sign in
                    </a>
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="fullName" className={`form-label ${styles.label}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className={`form-control ${styles.input} ${errors.fullName ? 'is-invalid' : ''}`}
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback d-block">
                        {errors.fullName}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className={`form-label ${styles.label}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${styles.input} ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="username" className={`form-label ${styles.label}`}>
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={`form-control ${styles.input} ${errors.username ? 'is-invalid' : ''}`}
                      placeholder="Must be Unique"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <div className="invalid-feedback d-block">
                        {errors.username}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className={`form-label ${styles.label}`}>
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`form-control ${styles.input} ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Min 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <button type="submit" className={`btn w-100 ${styles.submitButton}`}>
                    Juice Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}