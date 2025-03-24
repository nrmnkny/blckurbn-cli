// 📁 src/components/LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-20">
      <h2 className="text-yellow-400 font-bebas text-2xl mb-4">Admin Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        className="w-full p-2 mb-4 bg-gray-800 text-white border border-yellow-500 rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-2 mb-4 bg-gray-800 text-white border border-yellow-500 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-600"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
