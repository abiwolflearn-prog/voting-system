import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import VotingPage from './pages/VotingPage';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <LanguageProvider>
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 relative overflow-hidden dark:bg-gray-950 transition-colors duration-300">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none dark:opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none dark:opacity-10"></div>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex flex-col pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<div className="flex-grow p-4 md:p-8"><Login /></div>} />
                <Route path="/register" element={<div className="flex-grow p-4 md:p-8"><Register /></div>} />
                <Route path="/vote" element={
                  <PrivateRoute>
                    <div className="flex-grow p-4 md:p-8"><VotingPage /></div>
                  </PrivateRoute>
                } />
                <Route path="/admin" element={
                  <PrivateRoute role="admin">
                    <div className="flex-grow p-4 md:p-8"><AdminPanel /></div>
                  </PrivateRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
