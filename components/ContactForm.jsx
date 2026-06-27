'use client';

import { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { submitFeedback } from '@/services/contact';

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters long';
  }

  return errors;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState('');

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useForm(
    {
      name: '',
      email: '',
      message: '',
    },
    validate
  );

  const onSubmit = async (data) => {
    setApiError('');
    setLoading(true);

    try {
      const result = await submitFeedback(data);

      if (!result.success) {
        setApiError(result.message || 'Something went wrong. Please try again.');
        return;
      }

      reset();
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setApiError('Unable to send message. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-success">
        <h3>✅ Thank you for your feedback!</h3>
        <p>We appreciate your input!</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>

      {apiError && (
        <p className="contact-error" style={{ marginBottom: '16px' }}>
          {apiError}
        </p>
      )}

      <div className="contact-form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
          <p className="contact-error">{errors.name}</p>
        )}
      </div>

      <div className="contact-form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <p className="contact-error">{errors.email}</p>
        )}
      </div>

      <div className="contact-form-group">
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          rows="4"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.message && touched.message && (
          <p className="contact-error">{errors.message}</p>
        )}
      </div>

      <button type="submit" className="contact-submit-btn" disabled={loading}>
        {loading ? 'Sending…' : 'Send Message'}
      </button>

    </form>
  );
}
