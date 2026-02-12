import React, { useState, useEffect } from 'react';
import { 
  HiOutlinePlus, 
  HiOutlineTrash, 
  HiOutlineArchiveBoxXMark,
  HiOutlineCheckCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlinePhoto,
  HiOutlineTag,
  HiOutlineCurrencyDollar
} from 'react-icons/hi2';
import api from '../api/axios';
import Swal from 'sweetalert2';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    harga: '',
    kategori: 'makanan',
    image: '',
    isAvailable: true
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/product');
      setProducts(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil produk", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await api.patch(`/product/${id}`, { isAvailable: !currentStatus });
      fetchProducts();
    } catch (err) {
      Swal.fire('Error', 'Gagal memperbarui status', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/product', formData);
      setIsModalOpen(false);
      setFormData({ nama: '', harga: '', kategori: 'makanan', image: '', isAvailable: true });
      Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Menu telah ditambahkan', timer: 1500, showConfirmButton: false });
      fetchProducts();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || "Gagal menambah produk", 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Hapus Menu?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/product/${id}`);
        fetchProducts();
      } catch (err) {
        Swal.fire('Error', 'Gagal menghapus produk', 'error');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col justify-center items-center py-40 gap-4">
      <div className="w-10 h-10 border-4 border-slate-900 border-t-orange-500 rounded-full animate-spin"></div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Memuat Menu...</p>
    </div>
  );

  return (
    // pb-32 di mobile agar tidak tertutup navbar dock
    <div className="space-y-8 animate-in fade-in duration-700 pb-32 md:pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex items-end justify-between px-1">
        <div>
          <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">
            Master <span className="text-orange-500">Menu</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {products.length} Items
          </p>
        </div>
        
        {/* Tombol Tambah (Desktop View) */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="hidden md:flex bg-slate-900 text-white items-center gap-2 px-6 py-4 rounded-[1.5rem] shadow-xl hover:bg-orange-500 transition-all"
        >
          <HiOutlinePlus size={20} strokeWidth={3} />
          <span className="text-[11px] font-black uppercase tracking-widest">Tambah Menu</span>
        </button>
      </div>

      {/* --- FLOATING ACTION BUTTON (Mobile View) --- */}
      {/* Muncul di atas navbar dock agar tidak terhalang */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-24 right-6 z-[90] bg-orange-500 text-white p-5 rounded-3xl shadow-[0_10px_30px_rgba(249,115,22,0.4)] active:scale-90 transition-transform"
      >
        <HiOutlinePlus size={28} strokeWidth={3} />
      </button>

      {/* --- PENCARIAN --- */}
      <div className="relative group mx-1">
        <div className="absolute inset-y-0 left-5 flex items-center text-slate-600">
          <HiOutlineMagnifyingGlass size={20} strokeWidth={2.5} />
        </div>
        <input 
          type="text" 
          placeholder="CARI MENU..." 
          className="w-full bg-white border-2 border-slate-300 py-5 pl-14 pr-6 rounded-[2rem] focus:border-orange-500/50 outline-none text-[11px] font-black uppercase tracking-widest placeholder-slate-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- GRID PRODUK --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className={`group bg-white rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${!product.isAvailable ? 'border-red-50 opacity-80' : 'border-slate-50 shadow-sm'}`}>
            <div className="relative h-48 overflow-hidden">
              <img src={product.image} alt={product.nama} className={`w-full h-full object-cover ${!product.isAvailable ? 'grayscale' : ''}`} />
              {!product.isAvailable && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
                  <span className="border-2 border-white text-white px-6 py-2 rounded-full font-black uppercase italic tracking-tighter text-sm">Sold Out</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-black text-slate-800 text-lg uppercase truncate italic">{product.nama}</h3>
                  <p className="text-orange-500 font-black text-xl tracking-tighter mt-1">Rp {product.harga?.toLocaleString('id-ID')}</p>
                </div>
                <button onClick={() => handleDelete(product._id)} className="p-3 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                  <HiOutlineTrash size={18} />
                </button>
              </div>
              <button 
                onClick={() => toggleStatus(product._id, product.isAvailable)} 
                className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${product.isAvailable ? 'bg-slate-50 text-slate-500' : 'bg-green-600 text-white'}`}
              >
                {product.isAvailable ? <><HiOutlineArchiveBoxXMark size={18} /> Habis</> : <><HiOutlineCheckCircle size={18} /> Tersedia</>}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL TAMBAH PRODUK --- */}
      {isModalOpen && (
        // z-index 110 agar di atas navbar dock (z-100)
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-slate-900/80 backdrop-blur-md px-0 sm:px-4 transition-all">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          <form 
            onSubmit={handleSubmit}
            className="relative bg-white w-full max-w-xl rounded-t-[3rem] sm:rounded-[3rem] p-8 sm:p-10 space-y-6 animate-in slide-in-from-bottom-20 duration-500 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center sticky top-0 bg-white z-10 pb-4">
              <h3 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">Tambah <span className="text-orange-500">Menu</span></h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-slate-100 p-3 rounded-2xl text-slate-400"><HiOutlineXMark size={24} /></button>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Nama Menu</label>
                <input required type="text" className="w-full bg-slate-50 rounded-2xl py-5 px-6 text-sm font-bold outline-none border-2 border-transparent focus:border-orange-500/20" placeholder="Bakwan..."
                  value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 italic">Harga</label>
                  <input required type="number" className="w-full bg-slate-50 rounded-2xl py-5 px-6 text-sm font-bold outline-none" placeholder="0"
                    value={formData.harga} onChange={(e) => setFormData({...formData, harga: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 italic">Kategori</label>
                  <select className="w-full bg-slate-50 rounded-2xl py-5 px-6 text-sm font-bold outline-none appearance-none"
                    value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})}>
                    <option value="makanan">MAKANAN</option>
                    <option value="minuman">MINUMAN</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">URL Foto</label>
                <input required type="text" className="w-full bg-slate-50 rounded-2xl py-5 px-6 text-sm font-bold outline-none border-2 border-transparent focus:border-orange-500/20" placeholder="https://..."
                  value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
              </div>
            </div>

            {/* Tambahan padding bawah di tombol submit agar jempol mudah menekan tanpa terhalang dock */}
            <div className="pt-4 pb-8 sm:pb-0">
              <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-xl hover:bg-orange-500 transition-all">
                Simpan Produk
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
