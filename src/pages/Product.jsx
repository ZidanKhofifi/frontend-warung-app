import React, { useState, useEffect, useRef } from 'react';
import { 
  HiOutlineMagnifyingGlass, 
  HiPlus, 
  HiOutlineFire,
  HiOutlineGift,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineSquares2X2,
  HiOutlineShoppingCart,
  HiOutlineSparkles
} from 'react-icons/hi2';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  const { addToCart } = useCart();
  const categories = ['Semua', 'Makanan', 'Minuman'];

  const heroSlides = [
    {
      id: 'store-info',
      tag: "Lokasi Kami",
      title: "FoodHub Gorengan Pusat",
      desc: "Jl. Raya Gorengan No. 123, Jakarta. Gorengan renyah yang selalu hangat.",
      subDesc: "Buka: 08:00 - 21:00",
      color: "bg-slate-900",
      icon: <HiOutlineMapPin size={70} />,
      actionLabel: "Maps",
      link: "https://maps.google.com",
      isPromo: false
    },
    {
      id: 'promo-1',
      tag: "Promo Spesial",
      title: "Beli 10 Gratis 1",
      desc: "Berlaku untuk semua jenis gorengan. Pesan melalui website resmi.",
      subDesc: "Promo Terbatas!",
      color: "bg-[#ff9900]",
      icon: <HiOutlineGift size={70} />,
      actionLabel: "Pesan",
      link: "#menu",
      isPromo: true
    }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const index = Math.round(scrollLeft / width);
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/product");
        setProducts(res.data.data || []);
      } catch (e) {
        console.error(e.response?.data?.message || e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'Semua' || p.kategori?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = p.nama?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-10 pb-32">
      
      {/* --- HERO SLIDER --- */}
      <section className="relative">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2"
        >
          {heroSlides.map((slide) => (
            <div 
              key={slide.id}
              className={`flex-none w-full snap-center ${slide.color} rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden min-h-[160px] md:min-h-[200px] flex items-center shadow-xl shadow-slate-100`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] -mr-16 -mt-16"></div>
              <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 bg-black/20 w-fit px-3 py-1 rounded-full mb-3 backdrop-blur-md">
                     {slide.isPromo ? <HiOutlineFire size={12} className="text-white" /> : <HiOutlineSparkles size={12} className="text-white" />}
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">{slide.tag}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-widest max-w-lg mb-4">
                    {slide.desc}
                  </p>
                  <a id="menu" href={slide.link} className="bg-white text-black px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 hover:bg-slate-800 hover:text-white transition-all shadow-lg">
                    {slide.actionLabel} <HiOutlineArrowTopRightOnSquare size={14} />
                  </a>
                </div>
                <div className="hidden md:block text-white/10">{slide.icon}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {heroSlides.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-slate-900 w-6' : 'bg-slate-200 w-1.5'}`}></div>
          ))}
        </div>
      </section>

      {/* --- FILTER & SEARCH --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 p-3 rounded-2xl">
            <HiOutlineSquares2X2 size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">Menu</h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex bg-slate-100 p-1 rounded-2xl w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all
                  ${activeCategory === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative group w-full md:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 py-3 pl-12 pr-4 rounded-2xl focus:border-[#ff9900] transition-all text-sm font-bold outline-none"
            />
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID (FIXED RATIO) --- */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(n => <div key={n} className="h-64 bg-slate-100 animate-pulse rounded-[2.5rem]" />)}
        </div>
      ) : (
        /* Menggunakan grid-cols-5 di layar sangat lebar agar kartu tidak terlalu melar ke samping */
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product._id} 
              className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Section: Diubah ke aspect-square atau video ratio agar tidak terlalu tinggi */}
              <div className="relative aspect-square md:aspect-[4/3] overflow-hidden bg-slate-50">
                <img 
                  src={product.image} 
                  alt={product.nama} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                {!product.isAvailable && (
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                    <span className="text-[10px] font-black uppercase text-white border-2 border-white px-3 py-1 rounded-full -rotate-12">Habis</span>
                  </div>
                )}
              </div>

              {/* Info Section: Padding dikurangi agar lebih compact */}
              <div className="p-4 flex flex-col flex-1">
                <div className="mb-3 flex-1">
                  <h3 className="font-black text-slate-900 text-xs md:text-sm leading-tight uppercase tracking-tight italic truncate mb-1">
                    {product.nama}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] text-[#ff9900] font-black italic">RP</span>
                    <span className="font-black text-slate-900 text-base md:text-lg tracking-tighter">
                      {product.harga?.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => addToCart(product)}
                  disabled={!product.isAvailable}
                  className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-black text-[9px] uppercase tracking-widest
                    ${product.isAvailable 
                      ? 'bg-slate-900 text-white hover:bg-[#ff9900] active:scale-95' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    }`}
                >
                  <HiOutlineShoppingCart size={16} />
                  Tambah
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      <div className="text-center pt-20 border-t border-slate-100">
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em]">FoodHub Gorengan © 2026</p>
      </div>
    </div>
  );
};

export default Product;
