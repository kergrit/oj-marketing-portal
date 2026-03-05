# OJ Portal - OMODA & JAECOO Dealer SPA

Single Page Application สำหรับ Dealer Portal (สร้างจาก omoda-dealer-v3.jsx)

## การรันบน localhost

```bash
cd app
npm install   # ถ้ายังไม่ได้ติดตั้ง
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ที่ **http://localhost:5173**

## สคริปต์

- `npm run dev` – รัน development server (hot reload)
- `npm run build` – build สำหรับ production
- `npm run preview` – ดูผลลัพธ์หลัง build

## โครงสร้างโฟลเดอร์

```
app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx      # จุดเข้าแอป
    ├── index.css     # Tailwind + โกลบอลสไตล์
    └── App.jsx       # คอมโพเนนต์หลัก (Monthly Plan, Content Approval, ฯลฯ)
```
