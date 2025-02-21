'use client'

import React, { useState } from 'react';

const AuthTest = () => {
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [accessToken, setAccessToken] = useState('');

  // Handle changes for signup form inputs
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  // Handle changes for login form inputs
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Signup API call
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:5000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData)
      });
      const data = await res.json();
      if (res.ok) {
        setAccessToken(data.access_token);
        alert('Signup successful!');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error during signup');
    }
  };

  // Login API call
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (res.ok) {
        setAccessToken(data.access_token);
        alert('Login successful!');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error during login');
    }
  };

  // Logout API call
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:5000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setAccessToken('');
        alert('Logout successful!');
      } else {
        alert(data.message || 'Logout failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error during logout');
    }
  };

  // Google OAuth login (redirects the browser to the OAuth flow)
  const handleGoogleLogin = () => {
    window.location.href = 'http://127.0.0.1:5000/auth/login/google';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Auth Test</h1>
        
        {/* Signup Form */}
        <form onSubmit={handleSignup} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Signup</h2>
          <input
            type="text"
            name="name"
            value={signupData.name}
            onChange={handleSignupChange}
            placeholder="Name"
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Signup
          </button>
        </form>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Login</h2>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Logout Button */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Logout</h2>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
            disabled={!accessToken}
          >
            Logout
          </button>
        </div>

        {/* Google OAuth Login Button */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Google OAuth Login</h2>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-900 transition-colors"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthTest;
