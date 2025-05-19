# 💸 Payment Manager App (Toman - Frontend Assignment)

A fully featured **payment tracking** web application built with **React**, **Vite**, and **TypeScript**. This project was developed as part of the **Frontend Engineer assignment for Toman** and showcases clean architecture, URL-driven filters, and responsive UI with a great developer experience.

---

## ✨ Features

- 🔍 **Search payments** by description (URL-synced)
- 🧾 **Filter by type and status** with real-time state updates
- 📄 **Paginated results** with full control of page/limit
- 🔗 **Deep linking & state persistence** via `URLSearchParams`
- 📂 **Detailed payment view** with full transaction breakdown
- 🧠 Smart state management using **React Context + custom hooks**
- 🧱 Built with **Tailwind CSS** and fully **responsive design**
- 🚫 Error + loading states handled gracefully
- 🔧 Clean, modular **TypeScript** codebase with full type safety

---

## 🗂️ Project Structure

```bash
src/
├── components/
│   ├── payments/          # PaymentCard, List, Filters, Search
│   └── common/            # Button, Input, Badge, Card, Pagination, Spinner
├── context/               # PaymentContext
├── hooks/                 # usePaymentFilters
├── pages/                 # PaymentListPage, PaymentDetailsPage
├── types/                 # payment.types.ts
├── utils/                 # formatters, api
```

---

## 🛠️ Run Locally

### 🛠️ How to Run


1. Clone the repo:
```bash
git clone https://github.com/your-username/toman-payment-app.git
cd toman-payment-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the app:
```bash
npm run dev
```
Opens: [http://localhost:5173](http://localhost:5173)


##📌 Notes
This project expects a backend to be running at http://localhost:8000, based on the assignment specs.
The API must expose endpoints like /payments and /payments/:id.

---

## ✅ Requirements Implemented

- [x] Payment List Page with pagination
- [x] Search functionality (by description)
- [x] Filter by type and status
- [x] Pagination with `page` and `limit` in query string
- [x] Persistent state with `URLSearchParams`
- [x] Payment Details Page with full transaction info
- [x] React Context for global state
- [x] TypeScript + TailwindCSS + modular file structure
- [x] Graceful error handling and loading states

---

## ✨ Bonus Points

- ✅ Modern responsive UI using **TailwindCSS**
- ✅ State persists via **URL parameters**
- ✅ UX optimized for mobile and desktop

---

### 🤍 Built with care for Toman
