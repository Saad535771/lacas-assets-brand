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
<<<<<<< Updated upstream

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
=======
  const [isLoading, setIsLoading] = useState(false); // UX ke liye loading state

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(''); 
    setError('');
    setIsLoading(true);
    
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message);
      setEmail(''); // Email field clear kar dein success ke baad
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
>>>>>>> Stashed changes
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
<<<<<<< Updated upstream
    setMessage(''); setError('');
    try {
      const res = await api.post('/auth/reset-password', { token, newPassword });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 3000); // 3 seconds baad login par bhejein
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired token');
=======
    setMessage(''); 
    setError('');
    setIsLoading(true);
    
    try {
      const res = await api.post('/auth/reset-password', { token, newPassword });
      setMessage(res.data.message + " Redirecting to login...");
      setNewPassword('');
      setTimeout(() => navigate('/login'), 3000); // 3 seconds baad login par bhejein
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired token');
    } finally {
      setIsLoading(false);
>>>>>>> Stashed changes
    }
  };

  return (
<<<<<<< Updated upstream
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
=======
    <>
      {/* --- Custom Animations aur Styles (Login se match karte hue) --- */}
      <style>
        {`
          .animated-bg {
            background: linear-gradient(-45deg, #1e3c72, #2a5298, #093028, #237a57);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            min-height: 100vh;
          }
          
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            opacity: 0;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.2);
          }

          .hover-scale {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .hover-scale:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }
          
          .custom-input {
             border-radius: 12px;
             border: 1px solid #ced4da;
          }
          .custom-input:focus {
             box-shadow: 0 0 0 0.25rem rgba(42, 82, 152, 0.25);
             border-color: #2a5298;
          }
          .custom-alert {
             border-radius: 12px;
             font-size: 0.9rem;
             border: none;
          }
        `}
      </style>

      {/* --- Main UI --- */}
      <div className="animated-bg d-flex justify-content-center align-items-center p-3">
        <div className="card glass-card p-4 p-md-5 fade-in-up" style={{ width: '420px', maxWidth: '100%' }}>
          
          {/* Header Section */}
          <div className="text-center mb-4">
            <div className="d-inline-flex justify-content-center align-items-center mb-3 shadow-sm" 
                 style={{ width: '65px', height: '65px', borderRadius: '50%', background: 'linear-gradient(135deg, #2a5298, #1e3c72)', color: 'white', fontSize: '28px' }}>
              {token ? '🔐' : '✉️'}
            </div>
            <h3 className="fw-bold mb-1" style={{ color: '#1e3c72', letterSpacing: '0.5px' }}>
              {token ? 'Set New Password' : 'Forgot Password?'}
            </h3>
            <p className="text-muted small">
              {token ? 'Please enter your new password below.' : 'Enter your email to receive a reset link.'}
            </p>
          </div>

          {/* Success / Error Messages */}
          {message && <div className="alert alert-success custom-alert text-center fw-medium shadow-sm">{message}</div>}
          {error && <div className="alert alert-danger custom-alert text-center fw-medium shadow-sm">{error}</div>}

          {/* Conditional Forms */}
          {!token ? (
            // Form 1: Request Reset Link
            <form onSubmit={handleForgotPassword}>
              <div className="form-floating mb-4">
                <input 
                  type="email" 
                  className="form-control custom-input" 
                  id="floatingEmail"
                  placeholder="name@example.com"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  autoComplete="email"
                />
                <label htmlFor="floatingEmail" className="text-muted">Email Address</label>
              </div>

              <button 
                type="submit" 
                className="btn w-100 py-3 hover-scale fw-bold text-white" 
                disabled={isLoading}
                style={{ background: 'linear-gradient(135deg, #2a5298, #1e3c72)', border: 'none', borderRadius: '12px', letterSpacing: '1px' }}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : 'Send Reset Link'}
              </button>

              <div className="text-center mt-4">
                <a href="/login" className="text-decoration-none fw-semibold" style={{ color: '#6c757d', fontSize: '0.9rem', transition: '0.3s' }} onMouseOver={(e) => e.target.style.color = '#1e3c72'} onMouseOut={(e) => e.target.style.color = '#6c757d'}>
                  ← Back to Login
                </a>
              </div>
            </form>
          ) : (
            // Form 2: Enter New Password
            <form onSubmit={handleResetPassword}>
              <div className="form-floating mb-4">
                <input 
                  type="password" 
                  className="form-control custom-input" 
                  id="floatingPassword"
                  placeholder="New Password"
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                  minLength="6"
                  autoComplete="new-password"
                />
                <label htmlFor="floatingPassword" className="text-muted">New Password (Min. 6 chars)</label>
              </div>

              <button 
                type="submit" 
                className="btn w-100 py-3 hover-scale fw-bold text-white" 
                disabled={isLoading}
                style={{ background: 'linear-gradient(135deg, #28a745, #218838)', border: 'none', borderRadius: '12px', letterSpacing: '1px' }}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : 'Update Password'}
              </button>
            </form>
          )}
          
        </div>
      </div>
    </>
>>>>>>> Stashed changes
  );
};

export default ResetPassword;