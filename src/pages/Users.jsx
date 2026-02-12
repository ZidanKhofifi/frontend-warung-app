import React, { useState, useEffect } from 'react';
import { 
  HiOutlineUserCircle, 
  HiOutlinePhone, 
  HiOutlineTrash,
  HiOutlineShieldCheck,
  HiOutlineMagnifyingGlass,
  HiOutlineChatBubbleLeftRight,
  HiOutlineIdentification // Ikon tambahan untuk ID
} from 'react-icons/hi2';
import api from '../api/axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users'); 
      setUsers(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data user", err);
    } finally {
      setLoading(false);
    }
  };

  const hubungiWhatsApp = (noWa) => {
    if (!noWa) return alert("Nomor WhatsApp tidak tersedia");
    // Format nomor: hilangkan karakter non-digit dan pastikan kode negara 62
    const cleanNumber = noWa.replace(/\D/g, '').replace(/^0/, '62');
    const url = `https://wa.me/${cleanNumber}`;
    window.open(url, '_blank');
  };

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.noWa?.includes(searchTerm)
  );

  if (loading) return (
    <div className="flex justify-center py-20 text-orange-500">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* --- HEADER & SEARCH --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 italic uppercase tracking-tighter">Database Pelanggan</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {users.length} Orang Terdaftar
          </p>
        </div>
        
        <div className="relative group">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Cari nama atau nomor WA..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* --- USER GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-orange-500/5 transition-all group relative">
            
            {/* Status Badge (Absolute) */}
            <div className="absolute top-4 right-4">
              {user.role === 'admin' ? (
                <span className="flex items-center gap-1 text-[8px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-slate-200">
                  <HiOutlineShieldCheck size={12} className="text-orange-500" /> Staff
                </span>
              ) : (
                <span className="text-[8px] font-black bg-orange-50 text-orange-600 px-3 py-1 rounded-full uppercase tracking-widest border border-orange-100">
                  Member
                </span>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-300 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  <HiOutlineUserCircle size={40} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">{user.username}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <HiOutlineIdentification /> ID-{user._id.slice(-5).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Data Utama: Nomor WhatsApp */}
              <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp Aktif</p>
                <div className="flex items-center gap-2 text-slate-700">
                  <HiOutlinePhone className="text-orange-500" size={18} />
                  <span className="text-sm font-black tracking-wider">{user.noWa || 'Kosong'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => hubungiWhatsApp(user.noWa)}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-slate-100"
                >
                  <HiOutlineChatBubbleLeftRight size={18} /> Chat
                </button>
                <button className="flex items-center justify-center gap-2 bg-slate-50 text-red-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 border border-transparent hover:border-red-100 transition-all">
                  <HiOutlineTrash size={18} /> Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- EMPTY STATE --- */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-100">
            <HiOutlineUserCircle size={56} />
          </div>
          <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Data tidak ditemukan</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
