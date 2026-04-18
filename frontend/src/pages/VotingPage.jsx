import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, AlertCircle, LogOut } from 'lucide-react';

const VotingPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { user, logout, fetchUser } = useContext(AuthContext);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/vote/candidates');
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate) return;
    setError('');
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/vote', { candidateId: selectedCandidate });
      setMessage('Vote submitted successfully! Thank you for participating.');
      await fetchUser();
      fetchCandidates();
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting vote');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-white/20 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Student Voting Portal</h2>
          <p className="text-slate-500">Welcome, {user?.name}</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <div className="glass-panel p-8">
        {user?.hasVoted ? (
          <div className="text-center py-12">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">You've Already Voted</h3>
            <p className="text-slate-600">Thank you for participating in the election. Your vote has been recorded.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-200 pb-4">
              <CheckCircle className="text-blue-600" />
              Select Your Candidate
            </h3>
            
            {error && <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2"><AlertCircle size={20} />{error}</div>}
            {message && <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-2"><CheckCircle size={20} />{message}</div>}

            {candidates.length === 0 ? (
              <div className="text-center py-10 text-slate-500">
                No candidates available at the moment.
              </div>
            ) : (
              <div className="space-y-4">
                {candidates.map((c) => (
                  <label 
                    key={c._id} 
                    className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedCandidate === c._id 
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 shadow-md transform scale-[1.02]' 
                        : 'border-slate-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-500'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedCandidate === c._id ? 'border-indigo-600' : 'border-slate-300 dark:border-slate-600'}`}>
                        {selectedCandidate === c._id && <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>}
                      </div>
                      
                      {c.imageUrl ? (
                        <img src={c.imageUrl} alt={c.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-sm border border-slate-200 dark:border-gray-700" />
                      ) : (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-400 rounded-xl flex shrink-0 items-center justify-center border border-indigo-200 dark:border-indigo-800">
                          <span className="text-3xl font-black">{c.name.charAt(0)}</span>
                        </div>
                      )}

                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 dark:text-white text-xl">{c.name}</h4>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{c.position}</p>
                        {c.description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{c.description}</p>}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
              <button 
                onClick={handleVote} 
                disabled={!selectedCandidate || candidates.length === 0}
                className="btn-primary flex items-center gap-2 text-lg"
              >
                <CheckCircle size={20} />
                Cast Vote
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VotingPage;
