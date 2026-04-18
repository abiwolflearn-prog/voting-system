import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, BadgeCheck, UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await register(formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-full mt-10">
      <div className="glass-panel w-full max-w-md p-8 relative overflow-hidden">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Create Account</h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-slate-400" size={20} />
            </div>
            <input
              type="text"
              name="name"
              required
              className="input-field pl-10"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BadgeCheck className="text-slate-400" size={20} />
            </div>
            <input
              type="text"
              name="studentId"
              required
              className="input-field pl-10"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-slate-400" size={20} />
            </div>
            <input
              type="email"
              name="email"
              required
              className="input-field pl-10"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-slate-400" size={20} />
            </div>
            <input
              type="password"
              name="password"
              required
              className="input-field pl-10"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2 mt-4">
            <UserPlus size={20} />
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-slate-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
