import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { PlusCircle, Trash2, Users, AlertCircle, LogOut, Edit2, LayoutList, FileText, Image as ImageIcon, Calendar } from 'lucide-react';

const AdminPanel = () => {
  const [candidates, setCandidates] = useState([]);
  const [news, setNews] = useState([]);
  
  const [newCandidate, setNewCandidate] = useState({ name: '', position: '', description: '', imageUrl: '' });
  const [newNews, setNewNews] = useState({ title: '', content: '', imageUrl: '', author: 'System Admin' });
  const [editingId, setEditingId] = useState(null);
  
  const [activeTab, setActiveTab] = useState('candidates');
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchCandidates();
    fetchNews();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/vote/candidates');
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/news');
      setNews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/admin/candidates/${editingId}`, newCandidate);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/admin/candidates', newCandidate);
      }
      setNewCandidate({ name: '', position: '', description: '', imageUrl: '' });
      fetchCandidates();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (c) => {
    setNewCandidate({ name: c.name, position: c.position, description: c.description || '', imageUrl: c.imageUrl || '' });
    setEditingId(c._id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewCandidate({ name: '', position: '', description: '', imageUrl: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/candidates/${id}`);
      fetchCandidates();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/news', newNews);
      setNewNews({ title: '', content: '', imageUrl: '', author: 'System Admin' });
      fetchNews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <Users className="text-blue-600 dark:text-blue-400" />
          Admin Dashboard
        </h2>
        <button onClick={logout} className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 px-4 py-2 rounded-lg transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <div className="flex space-x-2 border-b border-slate-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-4 py-3 flex items-center gap-2 font-medium transition-colors border-b-2 ${
            activeTab === 'candidates' 
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <LayoutList size={18} /> Manage Candidates
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-3 flex items-center gap-2 font-medium transition-colors border-b-2 ${
            activeTab === 'news' 
              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <FileText size={18} /> Manage News
        </button>
      </div>

      {activeTab === 'candidates' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 border-r border-slate-200 dark:border-gray-700 pr-0 lg:pr-8">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                <PlusCircle size={22} className="text-indigo-600 dark:text-indigo-400" />
                {editingId ? 'Edit Candidate' : 'Add Candidate'}
              </h3>
              <form onSubmit={handleAddCandidate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input type="text" required className="input-field" placeholder="E.g. Jane Doe" value={newCandidate.name} onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role / Position</label>
                  <input type="text" required className="input-field" placeholder="E.g. Student Body President" value={newCandidate.position} onChange={(e) => setNewCandidate({ ...newCandidate, position: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><ImageIcon size={14} /> Image URL</label>
                  <input type="url" className="input-field" placeholder="https://example.com/photo.jpg" value={newCandidate.imageUrl} onChange={(e) => setNewCandidate({ ...newCandidate, imageUrl: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform Description</label>
                  <textarea className="input-field h-24 resize-none" placeholder="What does this candidate stand for?" value={newCandidate.description} onChange={(e) => setNewCandidate({ ...newCandidate, description: e.target.value })}></textarea>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">{editingId ? 'Save Changes' : 'Add Candidate'}</button>
                  {editingId && <button type="button" onClick={handleCancelEdit} className="btn-secondary">Cancel</button>}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Current Standings</h3>
            {candidates.length === 0 ? (
              <div className="glass-panel text-center py-16 text-slate-500 dark:text-slate-400 flex flex-col items-center">
                <AlertCircle size={48} className="mb-4 text-slate-300 dark:text-slate-600" />
                No candidates available. Start by adding one from the left.
              </div>
            ) : (
              <div className="space-y-4">
                {candidates.map((c) => (
                  <div key={c._id} className="glass-panel p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-center gap-4">
                      {c.imageUrl ? (
                        <img src={c.imageUrl} alt={c.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-900" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-500 dark:text-indigo-400 font-bold text-xl border-2 border-indigo-200 dark:border-indigo-800">{c.name.charAt(0)}</div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-lg">{c.name}</h4>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{c.position}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-center bg-slate-50 dark:bg-gray-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-gray-700">
                        <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400 leading-none">{c.votes}</span>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Votes</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => handleEdit(c)} className="text-slate-400 hover:text-blue-600 transition-colors" title="Edit"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(c._id)} className="text-slate-400 hover:text-red-500 transition-colors" title="Delete"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'news' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 border-r border-slate-200 dark:border-gray-700 pr-0 lg:pr-8">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                <FileText size={22} className="text-indigo-600 dark:text-indigo-400" />
                Post Announcement
              </h3>
              <form onSubmit={handleAddNews} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Headline</label>
                  <input type="text" required className="input-field" placeholder="E.g. Election Dates Announced" value={newNews.title} onChange={(e) => setNewNews({ ...newNews, title: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><ImageIcon size={14} /> Optional Image URL</label>
                  <input type="url" className="input-field" placeholder="https://example.com/banner.jpg" value={newNews.imageUrl} onChange={(e) => setNewNews({ ...newNews, imageUrl: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content Post</label>
                  <textarea required className="input-field h-32 resize-none" placeholder="Details of the announcement..." value={newNews.content} onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">Broadcast News</button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Recent Announcements</h3>
            {news.length === 0 ? (
              <div className="glass-panel text-center py-16 text-slate-500 dark:text-slate-400 flex flex-col items-center">
                <AlertCircle size={48} className="mb-4 text-slate-300 dark:text-slate-600" />
                No news posted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item._id} className="glass-panel p-5 relative group">
                     <button 
                        onClick={() => handleDeleteNews(item._id)} 
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100" 
                        title="Delete Announcement"
                      >
                        <Trash2 size={18} />
                      </button>
                    <div className="flex gap-4">
                      {item.imageUrl && (
                        <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-gray-700 hidden sm:block">
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-lg pr-8">{item.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1 mb-2">
                          <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
