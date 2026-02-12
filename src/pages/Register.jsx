import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { 
  HiOutlineUser, 
  HiOutlineLockClosed, 
  HiOutlineArrowRight, 
  HiOutlinePhone,
  HiOutlineEye, 
  HiOutlineEyeSlash 
} from 'react-icons/hi2';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    noWa: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/register', formData);
      if (response.status === 201) {
        setSuccess('Pendaftaran berhasil! Mengalihkan ke halaman login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // BG diubah ke Slate-50 agar kontras dengan kartu putih bersih
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6 font-sans">
      <div className="w-full max-w-sm">
        
        {/* LOGO TYPOGRAPHY */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center drop-shadow-sm">
            <span className="text-4xl font-black text-slate-900 tracking-tighter">Food</span>
            <span className="ml-1 bg-[#ff9900] text-black text-3xl font-black px-2 py-1 rounded-md leading-none shadow-orange-200 shadow-lg">Hub</span>
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-5 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-200">
            Create New Account
          </p>
        </div>

        {/* REGISTER CARD */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white">
          
          <form onSubmit={handleRegister} className="space-y-5">
            
            {error && (
              <div className="bg-red-50 text-red-600 text-[11px] font-bold px-4 py-3 rounded-xl text-center border-2 border-red-100 animate-shake">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 text-[11px] font-bold px-4 py-3 rounded-xl text-center border-2 border-green-100">
                {success}
              </div>
            )}

            {/* Field Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff9900] transition-colors">
                  <HiOutlineUser size={18} />
                </span>
                <input
                  name="username"
                  type="text"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:border-[#ff9900] focus:outline-none transition-all placeholder:text-slate-300"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Field Nomor WhatsApp */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff9900] transition-colors">
                  <HiOutlinePhone size={18} />
                </span>
                <input
                  name="noWa"
                  type="number"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:border-[#ff9900] focus:outline-none transition-all placeholder:text-slate-300"
                  placeholder="08123456789"
                  value={formData.noWa}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Field Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff9900] transition-colors">
                  <HiOutlineLockClosed size={18} />
                </span>
                
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:border-[#ff9900] focus:outline-none transition-all placeholder:text-slate-300"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors focus:outline-none"
                >
                  {showPassword ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all duration-300 flex items-center justify-center gap-2 mt-4
                ${loading 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-slate-900 hover:bg-[#ff9900] active:scale-95 shadow-xl shadow-slate-200 hover:shadow-orange-200'
                }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Daftar Sekarang
                  <HiOutlineArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Card */}
          <div className="mt-10 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">
              Sudah punya akun? <Link to="/login" className="text-[#ff9900] font-black ml-1 hover:text-slate-900 transition-colors">Masuk Disini</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
