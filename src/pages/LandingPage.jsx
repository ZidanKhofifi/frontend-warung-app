import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiArrowRight, 
  HiOutlineFire,
  HiOutlineShoppingBag,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineHandThumbUp,
  HiOutlineUserPlus,
  HiOutlineChevronRight
} from 'react-icons/hi2';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-[#ff9900]/20 selection:text-[#ff9900] overflow-x-hidden p-0 md:p-4">
      
      {/* --- MAIN WRAPPER --- */}
      <div className="max-w-[1440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)] bg-white min-h-screen flex flex-col md:rounded-[3rem] overflow-hidden border border-white">
        
        {/* --- NAVIGATION --- */}
        <nav className="flex justify-between items-center px-6 md:px-12 py-8 w-full sticky top-0 bg-white/90 backdrop-blur-md z-50">
          <div className="flex items-center group cursor-pointer">
            <div className="flex items-center">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">Gorengan</span>
              <span className="ml-1 bg-[#ff9900] text-black text-2xl font-black px-2 py-0.5 rounded-md leading-none shadow-lg shadow-orange-100">Hub</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <Link to="/login" className="hidden sm:block text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
              Masuk
            </Link>
            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block"></div>
            <Link to="/register" className="flex items-center gap-2 bg-slate-50 text-slate-900 px-5 py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-100 transition-all active:scale-95">
              <HiOutlineUserPlus size={16} className="text-[#ff9900]" /> Daftar
            </Link>
            <Link to="/login" className="bg-slate-900 text-white px-5 md:px-8 py-3 md:py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-xl hover:bg-[#ff9900] hover:text-black transition-all active:scale-95">
              Pesan
            </Link>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <main className="flex-grow">
          <section className="px-6 md:px-12 pt-12 pb-24 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 lg:space-y-10">
              <div className="inline-flex items-center gap-3 bg-orange-50 border border-orange-100 px-5 py-2.5 rounded-full">
                <HiOutlineFire className="text-[#ff9900] animate-bounce" size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Level Krispi Tertinggi di Kota!</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl xl:text-[8.5rem] font-black text-slate-900 tracking-tighter leading-[0.85] uppercase">
                Makan <br /> 
                Enak Tak <br />
                Harus <span className="text-[#ff9900] italic">Mahal.</span>
              </h1>
              
              <p className="text-slate-500 text-base md:text-xl max-w-md font-medium leading-relaxed">
                Platform pesan gorengan nomor 1. Hangat, higienis, dan siap jemput tanpa antre panjang di pinggir jalan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/login" className="bg-[#ff9900] text-black px-10 py-6 rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-4 shadow-2xl shadow-orange-200 hover:bg-slate-900 hover:text-white transition-all active:scale-95 group">
                  Mulai Pesan Sekarang <HiArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                </Link>
                
                <Link to="/register" className="flex items-center justify-center gap-3 px-10 py-6 bg-white rounded-[2rem] border-2 border-slate-100 hover:border-[#ff9900] transition-all group">
                   <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-black">Buat Akun Gratis</span>
                   <HiOutlineChevronRight size={18} className="text-slate-300 group-hover:text-[#ff9900]" />
                </Link>
              </div>
            </div>

            {/* --- HERO IMAGE VISUAL --- */}
            <div className="relative flex justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-br from-orange-200/40 to-transparent rounded-full blur-[100px] opacity-60"></div>
              
              {/* Floating Badge 1 */}
              <div className="absolute -left-6 top-1/4 bg-white/90 backdrop-blur-md p-5 rounded-[2.5rem] shadow-2xl z-20 hidden xl:flex items-center gap-4 border border-white animate-bounce-slow">
                <div className="w-12 h-12 bg-[#ff9900] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                  <HiOutlineSparkles size={24} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Kualitas</p>
                  <p className="text-xs font-black text-slate-900 uppercase">Minyak Premium</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -right-6 bottom-1/4 bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl z-20 hidden xl:flex items-center gap-4 animate-bounce-slow" style={{animationDelay: '1s'}}>
                <div className="w-12 h-12 bg-white/10 text-[#ff9900] rounded-2xl flex items-center justify-center">
                  <HiOutlineHandThumbUp size={24} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Kepuasan</p>
                  <p className="text-xs font-black text-white uppercase italic">Rating 4.9/5</p>
                </div>
              </div>

              <div className="relative bg-white p-4 md:p-6 rounded-[3.5rem] md:rounded-[4.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-50 w-full max-w-[520px]">
                 <div className="rounded-[2.8rem] md:rounded-[3.8rem] overflow-hidden aspect-[4/5] relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=1000" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt="Gorengan Premium" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-12 left-12 text-white">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff9900] mb-3">Produk Unggulan</p>
                       <p className="text-4xl md:text-5xl font-black tracking-tighter leading-none italic uppercase">Bakwan <br/> Sayur Jumbo</p>
                    </div>
                 </div>
              </div>
            </div>
          </section>

          {/* --- BRAND PARTNERS / CATEGORIES --- */}
          <section className="px-6 md:px-12 py-12 border-y border-slate-50">
            <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Tersedia Berbagai Pilihan Snack</p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              {['Tahu Berontak', 'Mendoan Purwokerto', 'Pisang Tanduk', 'Cireng Salju', 'Bakwan Jagung', 'Singkong Mereksah'].map((item) => (
                <div key={item} className="px-7 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:scale-105 transition-all cursor-default">
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* --- STATS SECTION --- */}
          <section className="px-6 md:px-12 py-20 grid grid-cols-2 md:grid-cols-4 gap-8 bg-slate-900 text-white rounded-[2rem] md:rounded-[4rem] mx-4 my-10">
            {[
              { val: '500+', label: 'Pesanan Harian' },
              { val: '100%', label: 'Halal & Higienis' },
              { val: '15 Menit', label: 'Rata-rata Masak' },
              { val: '24/7', label: 'Bantuan CS' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <h4 className="text-3xl md:text-5xl font-black text-[#ff9900] italic uppercase group-hover:scale-110 transition-transform duration-500">{stat.val}</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-3">{stat.label}</p>
              </div>
            ))}
          </section>

          {/* --- FEATURES --- */}
          <section className="px-6 md:px-12 py-32">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
              <div className="max-w-xl">
                <h2 className="text-[10px] font-black text-[#ff9900] uppercase tracking-[0.5em] mb-4">Keunggulan</h2>
                <p className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter italic uppercase leading-[0.9]">Bukan Sekadar <br/> Gorengan Biasa</p>
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-xs text-right hidden md:block">
                Kami menggabungkan resep tradisional dengan teknologi modern.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 xl:gap-12">
              {[
                { 
                  title: "Minyak Sekali Pakai", 
                  desc: "Kami menjamin kualitas minyak jernih untuk kesehatan jantung Anda dan rasa yang lebih bersih.",
                  icon: <HiOutlineSparkles size={28} />
                },
                { 
                  title: "Sistem Antrean Cloud", 
                  desc: "Pesan dari rumah, ambil saat matang. Ucapkan selamat tinggal pada berdiri di pinggir jalan.",
                  icon: <HiOutlineClock size={28} />
                },
                { 
                  title: "Packaging Eco-Friendly", 
                  desc: "Menggunakan kertas khusus makanan yang ramah lingkungan dan menjaga krispi lebih lama.",
                  icon: <HiOutlineShoppingBag size={28} />
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 flex flex-col items-center text-center group hover:bg-slate-900 transition-all duration-500">
                  <div className="w-20 h-20 bg-slate-50 text-[#ff9900] rounded-[2.2rem] flex items-center justify-center mb-10 group-hover:bg-[#ff9900] group-hover:text-black transition-all duration-500 group-hover:rotate-12">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase italic group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium group-hover:text-slate-400 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* --- FOOTER --- */}
        <footer className="py-20 bg-slate-50 px-6 md:px-12 text-center border-t border-slate-100">
           <div className="flex flex-col items-center gap-8">
              <div className="flex items-center">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">Gorengan</span>
                <span className="ml-1 bg-[#ff9900] text-black text-2xl font-black px-2 py-0.5 rounded-md leading-none">Hub</span>
              </div>
              
              <div className="flex gap-8">
                {['Menu', 'Tentang', 'Lokasi', 'Kontak'].map(link => (
                  <a key={link} href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">{link}</a>
                ))}
              </div>

              <div className="w-full max-w-xs h-[1px] bg-slate-200"></div>

              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">
                &copy; 2026 GORENGANHUB DIGITAL ASIA. ALL RIGHTS RESERVED.
              </p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
