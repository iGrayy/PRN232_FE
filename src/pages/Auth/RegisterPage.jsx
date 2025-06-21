// src/pages/Auth/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import toast from 'react-hot-toast';
import FloatingInput from '../../components/input/FloatingInput';
import baseApi from '../../api/baseApi';
import API_PATHS from '../../api/apiPaths';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    avatarUrl: 'string',
    bio: 'string'
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'gender' ? Number(value) : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await baseApi.post(API_PATHS.REGISTER_CUSTOMER, form);
      toast.success('Đăng ký thành công!');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng ký thất bại';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-white px-4 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.6 }}
    >
      <button onClick={() => navigate('/')} className="absolute top-4 left-4 text-green-600 p-2 rounded-lg hover:bg-green-50 transition">
        <FaHome className="h-6 w-6" />
      </button>

      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 z-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      >
        <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">Create Account</h2>

        {error && <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingInput
            id="username"
            name="username"
            label="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <FloatingInput
            id="email"
            name="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <FloatingInput
            id="phone"
            name="phone"
            label="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <FloatingInput
            id="password"
            name="password"
            type="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <FloatingInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <FloatingInput
            id="fullName"
            name="fullName"
            label="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <FloatingInput
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            label="Date of Birth"
            value={form.dateOfBirth}
            onChange={handleChange}
          />

          {/* Gender select with peer and floating label */}
          <div className="relative">
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="peer w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="" disabled hidden />
              <option value={1}>Male</option>
              <option value={2}>Female</option>
              <option value={3}>Other</option>
            </select>
            <label
              htmlFor="gender"
              className="absolute left-4 bg-white px-1 transform transition-all
                peer-focus:-top-2 peer-focus:scale-90 peer-focus:text-green-600
                peer-valid:-top-2 peer-valid:scale-90 peer-valid:text-green-600
                top-4 text-base"
            >
              Gender
            </label>
          </div>

          <input type="hidden" name="avatarUrl" value={form.avatarUrl} />
          <input type="hidden" name="bio" value={form.bio} />

          <motion.button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition"
            whileTap={{ scale: 0.98 }}
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-medium hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
