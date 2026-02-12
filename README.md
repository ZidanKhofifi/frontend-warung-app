# 🛒 GorenganHub - Frontend Web App

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

GorenganHub adalah platform pemesanan gorengan digital modern yang memungkinkan pelanggan memesan tanpa perlu antre fisik. Sistem ini mendukung manajemen pesanan real-time dengan alur status terstruktur untuk admin.

---

## 🚀 Live Demo

🌐 Frontend: https://your-frontend-url.vercel.app  
🔗 Backend API: https://your-backend-url.vercel.app  

> Pastikan backend sudah berjalan agar fitur pemesanan dapat digunakan dengan baik.

---

## 🎯 Tujuan Project

Project ini dibuat untuk:

- Menerapkan konsep fullstack (React + REST API)
- Membangun sistem antrean digital
- Mengimplementasikan dashboard berbasis role (User & Admin)
- Menggunakan TailwindCSS untuk UI modern
- Deployment production-ready di Vercel

---

# 🌟 Fitur Utama

## 👤 Fitur Pelanggan

- ✅ Landing page modern & responsive
- ✅ Pilih menu gorengan
- ✅ Tambah ke keranjang
- ✅ Checkout pesanan
- ✅ Tracking status pesanan
- ✅ Redirect WhatsApp untuk konfirmasi admin
- ✅ Mobile-first design

---

## 🔑 Fitur Admin Dashboard

- ✅ Real-time order monitoring
- ✅ Update status pesanan:
  - Pending
  - Diproses
  - Siap Ambil
  - Selesai
  - Dibatalkan
- ✅ Tombol WhatsApp muncul sesuai status tertentu
- ✅ Tanpa reload manual

---

# 🛠️ Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js (Vite) |
| Styling | Tailwind CSS |
| Routing | React Router DOM v6 |
| HTTP | Axios |
| Icons | React Icons (Heroicons 2) |
| State | React Hooks |
| Animation | Tailwind Transitions |
| Deployment | Vercel |

---

# 📁 Struktur Folder

```
src/
│
├── components/      # Reusable components
├── pages/           # Halaman utama (Landing, Dashboard, dll)
├── layouts/         # Layout wrapper
├── services/        # Axios instance & API config
├── hooks/           # Custom hooks
├── assets/          # Gambar & file statis
└── App.jsx
```

---

# ⚙️ Environment Variables

Buat file `.env` di root project:

```
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
```

Akses di dalam project:

```javascript
import.meta.env.VITE_API_BASE_URL
```

---

# 📦 Instalasi Lokal

## 1️⃣ Clone Repository

```bash
git clone https://github.com/username/gorenganhub-frontend.git
cd gorenganhub-frontend
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Jalankan Project

```bash
npm run dev
```

Project akan berjalan di:

```
http://localhost:5173
```

---

# 🏗️ Build Production

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

# 🔌 Integrasi Backend

Frontend ini membutuhkan backend API dengan endpoint seperti:

```
GET     /orders
POST    /orders
PATCH   /orders/:id
GET     /orders/user/:userId
```

Pastikan backend:

- Mengaktifkan CORS
- Mengirim response JSON
- Mendukung autentikasi (jika menggunakan JWT)

---

# 🔒 Role System

| Role | Akses |
|------|-------|
| User | Pesan & Tracking |
| Admin | Kelola semua pesanan |

---

# 📱 Responsive Design

- Optimized untuk mobile
- Grid system modern
- Clean UI layout
- Smooth transition effect

---

# 🧠 Konsep yang Diimplementasikan

- Conditional Rendering
- Protected Route
- Axios Interceptor
- Status Workflow System
- Reusable Component Pattern
- Clean Folder Architecture

---

# 📸 Screenshot

Tambahkan folder `/screenshots` lalu masukkan gambar:

```
screenshots/
│
├── landing-page.png
├── dashboard-admin.png
└── tracking-user.png
```

Lalu tampilkan di README:

```markdown
![Landing Page](./screenshots/landing-page.png)
```

---

# 👨‍💻 Author

**Zidan**  
Frontend Developer (React Enthusiast)

---

# ⭐ Future Improvements

- 🔄 WebSocket real-time update
- 🔐 JWT Authentication
- 📊 Statistik penjualan
- 📦 Multi-outlet support
- 🔔 Push notification