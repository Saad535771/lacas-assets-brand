import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // UX ke liye loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Pura error clear karna naye login attempt par
    
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.message === 'Login successful') {
        localStorage.setItem('adminId', res.data.adminId);
        navigate('/admin');
      }
    } catch (err) {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* --- Custom Animations aur Styles --- */}
      <style>
        {`
          .animated-bg {
            /* Smooth moving gradient background */
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
            /* Card ke upar aane ki animation */
            animation: fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            opacity: 0;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .glass-card {
            /* Modern glassmorphism effect */
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.2);
          }

          .hover-scale {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .hover-scale:hover {
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
        `}
      </style>

      {/* --- Main UI --- */}
      <div className="animated-bg d-flex justify-content-center align-items-center">
        <div className="card glass-card p-5 fade-in-up" style={{ width: '420px', maxWidth: '90%' }}>
          
          {/* Header Section */}
          <div className="text-center mb-4">
            <div className="d-inline-flex justify-content-center align-items-center mb-3 shadow-sm" 
                 style={{ width: '65px', height: '65px', borderRadius: '50%', background: 'linear-gradient(135deg, #2a5298, #1e3c72)', color: 'white', fontSize: '28px' }}>
              🔒
            </div>
            <h3 className="fw-bold mb-1" style={{ color: '#1e3c72', letterSpacing: '0.5px' }}>Admin Portal</h3>
            <p className="text-muted small">Sign in to manage your dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger py-2 text-center fade show" style={{ borderRadius: '10px', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          {/* Form Section */}
          <form onSubmit={handleLogin}>
            
            {/* Floating Label for Email */}
            <div className="form-floating mb-3">
              <input 
                type="email" 
                className="form-control custom-input" 
                id="floatingEmail" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <label htmlFor="floatingEmail" className="text-muted">Email Address</label>
            </div>
            
            {/* Floating Label for Password */}
            <div className="form-floating mb-4">
              <input 
                type="password" 
                className="form-control custom-input" 
                id="floatingPassword" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <label htmlFor="floatingPassword" className="text-muted">Password</label>
            </div>

            {/* Animated Button */}
            <button 
              type="submit" 
              className="btn w-100 py-3 hover-scale fw-bold text-white mb-3" 
              disabled={isLoading}
              style={{ background: 'linear-gradient(135deg, #2a5298, #1e3c72)', border: 'none', borderRadius: '12px', letterSpacing: '1px' }}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : null}
              {isLoading ? 'Authenticating...' : 'LOGIN'}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-3 pt-3 border-top">
            <a href="/reset-password" 
               className="text-decoration-none fw-semibold" 
               style={{ color: '#2a5298', fontSize: '0.9rem', transition: '0.3s' }}
               onMouseOver={(e) => e.target.style.color = '#1e3c72'} 
               onMouseOut={(e) => e.target.style.color = '#2a5298'}
            >
              Forgot Password?
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminLogin;