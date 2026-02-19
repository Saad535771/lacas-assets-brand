import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // URL se token nikalna
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');
    try {
      const res = await api.post('/auth/reset-password', { token, newPassword });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 3000); // 3 seconds baad login par bhejein
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired token');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card admin-card p-4" style={{ width: '400px' }}>
        <h3 className="text-center text-primary-dark mb-4 brand-font">
          {token ? 'Set New Password' : 'Reset Password'}
        </h3>
        
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!token ? (
          // Form 1: Request Reset Link
          <form onSubmit={handleForgotPassword}>
            <div className="mb-3">
              <label className="form-label fw-bold">Enter your Email</label>
              <input 
                type="email" 
                className="form-control" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-accent w-100 mt-2">Send Reset Link</button>
            <div className="text-center mt-3">
              <a href="/login" className="text-decoration-none text-muted">Back to Login</a>
            </div>
          </form>
        ) : (
          // Form 2: Enter New Password
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label className="form-label fw-bold">New Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
                minLength="6"
              />
            </div>
            <button type="submit" className="btn btn-accent w-100 mt-2">Update Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;