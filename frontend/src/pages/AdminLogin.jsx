import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.message === 'Login successful') {
        localStorage.setItem('adminId', res.data.adminId);
        navigate('/admin');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card admin-card p-4" style={{ width: '400px' }}>
        <h2 className="text-center text-primary-dark mb-4 brand-font">Admin Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-accent w-100 mt-3">Login</button>
        </form>
        <div className="text-center mt-3">
          <a href="/reset-password" className="text-decoration-none" style={{ color: 'var(--primary-dark)' }}>Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;