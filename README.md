# 🛍️ ALLMERCH - Event Product Web Store

ALLMERCH adalah platform web yang dirancang untuk memudahkan pengunjung membeli produk dari event meskipun tidak hadir secara langsung. Dengan tampilan modern dan sistem yang responsif, pembeli dapat menjelajahi produk dan melakukan pembelian secara daring dengan mudah.

---

## 📌 Deskripsi Proyek

Proyek ini dibuat untuk membantu pembeli mengakses dan membeli produk dari suatu event tanpa harus datang ke lokasi acara. Melalui ALLMERCH, pembeli tetap dapat mengikuti event dan mendukung produk yang tersedia dari mana saja, secara praktis dan efisien.

---

## 🚀 Teknologi yang Digunakan

- **React.js** – untuk membangun antarmuka pengguna yang interaktif  
- **Bootstrap 5** – untuk tampilan responsif dan modern  
- **Prisma ORM** – untuk interaksi dengan database secara efisien  
- **Node.js & Express** – sebagai backend API 
- **PostgreSQL** – sebagai database utama 

---

## 🔧 Cara Menjalankan Proyek (Local Setup)

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/fernandors27/allmerch.git
   cd allmerch
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup database:**
   - Buat file `.env` dan tambahkan:
     ```
     DATABASE_URL="postgresql://postgres:password@localhost:5432/nama_database"
     ```
   - Jalankan Prisma:
     ```bash
     npx prisma migrate dev --name init
     ```

4. **Jalankan project:**
   ```bash
   npm run dev
   ```

5. Buka di browser: [http://localhost:3000](http://localhost:3000)

---

## 🧑‍🤝‍🧑 Tim Pengembang & Peran

- **Fernando Reddy Setiawan** (24SA31A013)  
  ➤ Pencarian aset, uji coba (trial & error), dan perbaikan bug.

- **Bangkit Anom Sedhayu** (21SA3092)  
  ➤ Konversi sistem dari PHP ke JavaScript/React, login system, dan pengelolaan database dengan Prisma.

- **Muhammad Rafa Fadhila** (24SA31A029)  
  ➤ Ide konsep, desain antarmuka web (UI/UX), dan pengembangan awal menggunakan PHP.

- **Fattan Haydar Ahmad** (24SA31A021)  
  ➤ Recorder.

---

## 📂 Struktur Folder

```
allmerch/
├── docs/
├── prisma/
│   ├── migrations/
│       ├── 20250527121144_create_all_tables/
│       ├── 20250606032104_rename_table_chart_to_chartorder/
│       ├── 20250606032350_/
│       └── migration_lock.toml
│   └── schema.prisma
├── src/
│   ├── application/
│   ├── controllers/
│   ├── error/
│   ├── middleware/
│   ├── public/
│       ├── image/
│       ├── img/merchandises/
│           ├── 00001/
│           ├── 44c4b/
│           ├── 454d1/
│           ├── 51066/
│           ├── 5bc2a/
│           ├── 69324/
│           ├── 78b73/
│           ├── b9a82/
│           ├── c8a50/
│           ├── e7d6d/
│           └── f1356/
│       └── script.js
│   ├── routes/
│   ├── services/
│   ├── validations/
│   ├── views
│       ├── admin/
│       ├── user/
│       ├── bundle_section.mustache
│       ├── index.mustahce
│       └── merchandise_detial.mustache
│   └── main.js
├── test/
├── .env
├── .gitignore
├── babel.config.json
├── package-lock.json
├── package.json
└── README.md
```

---

## 📃 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan tugas akademik. Tidak untuk penggunaan komersial tanpa izin.

---
