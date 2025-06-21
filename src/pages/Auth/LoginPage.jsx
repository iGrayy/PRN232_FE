// src/pages/Auth/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaHome } from 'react-icons/fa';
import FloatingInput from '../../components/input/FloatingInput';
import baseApi from '../../api/baseApi';
import API_PATHS from '../../api/apiPaths';

export default function LoginPage() {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ userName: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e =>
    setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await baseApi.post(API_PATHS.LOGIN, creds);
      const token = data.result?.accessToken || data.token;
      if (token) {
        localStorage.setItem('tokenA', token);
        toast.success('Đăng nhập thành công!');
        navigate('/');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng nhập thất bại';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-white px-4 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      {/* Home Icon Button Top-Left */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-green-600 p-2 rounded-lg hover:bg-green-50 transition"
      >
        <FaHome className="h-6 w-6" />
      </button>

      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 z-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      >
        <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingInput
            id="userName"
            name="userName"
            label="Username"
            value={creds.userName}
            onChange={handleChange}
            required
          />

          <FloatingInput
            id="password"
            name="password"
            type="password"
            label="Password"
            value={creds.password}
            onChange={handleChange}
            required
          />

          <motion.button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition"
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link to="/register" className="text-green-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
