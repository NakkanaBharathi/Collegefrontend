import { useParams } from "react-router-dom";
import { useState } from "react";
import '../styles/RegistrationForm.css';

export default function RegisterForm() {
  const { eventId } = useParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "", terms: false });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    if (!form.phone.trim()) errs.phone = "Phone is required.";
    if (!form.terms) errs.terms = "You must accept terms and conditions.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setMessage("");
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setMessage("");
    setErrors({});

    // Simulate API delay with setTimeout
    setTimeout(() => {
      setLoading(false);
      setMessage("Registration successful! Thank you for signing up.");
      setForm({ name: "", email: "", phone: "", terms: false });
    }, 1500);
  };

  const isFormValid = Object.keys(errors).length === 0 && form.terms;

  return (
    <div className="register-form-container" role="main" aria-label="Event registration form">
      <h2>Register for Event</h2>
      <form onSubmit={handleSubmit} className="register-form" noValidate>
        {/* inputs and labels (same as before) */}
        {/* ... */}
        <input
          id="name"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <input
          id="phone"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}

        <label>
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            required
          />
          Accept Terms and Conditions
        </label>
        {errors.terms && <span className="error-message">{errors.terms}</span>}

        <button type="submit" disabled={loading || !isFormValid}>
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
}
