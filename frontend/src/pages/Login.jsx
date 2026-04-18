import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, LogIn, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      
      if (role === 'admin' && userData?.role !== 'admin') {
         setError('This account does not have administrator privileges.');
         return;
      }
      
      if (userData?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-10">
      <div className="glass-panel w-full max-w-md p-8 relative overflow-hidden">
        
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mb-8">
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'student' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
            onClick={() => { setRole('student'); setError(''); }}
          >
            {t('login', 'studentLogin')}
          </button>
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${role === 'admin' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
            onClick={() => { setRole('admin'); setError(''); }}
          >
            <ShieldAlert size={16} /> {t('login', 'adminLogin')}
          </button>
        </div>

        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 text-center">
          {role === 'admin' ? t('login', 'adminPortal') : t('login', 'welcomeBack')}
        </h2>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center text-sm font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-slate-400" size={20} />
            </div>
            <input
              type="email"
              required
              className="input-field pl-10"
              placeholder={role === 'admin' ? t('login', 'adminEmail') : t('login', 'studentEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-slate-400" size={20} />
            </div>
            <input
              type="password"
              required
              className="input-field pl-10"
              placeholder={t('login', 'password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2 mt-2">
            <LogIn size={20} />
            {role === 'admin' ? t('login', 'accessDashboard') : t('login', 'signIn')}
          </button>
        </form>
        
        {role === 'student' && (
          <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
            {t('login', 'noAccount')} <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">{t('login', 'registerHere')}</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
