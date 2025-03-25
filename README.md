# ScrapeSift
An web scraper that extracts text, images, and links from public websites with ease.

## Key Features
✅ Extracts Text, Images, and Links from Any Webpage  
⚡ Fast and Efficient Scraping with Puppeteer  
🔄 Real-time Data Extraction  
🔒 Secure Authentication with JWT  
📱 User-Friendly Dashboard  

## Project Structure
```
scrapesift/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── authRoutes.js
│   │   └── scrapeRoutes.js
│   ├── .env
│   ├── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthForm.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Landing.jsx
│   │   │   └── Scraper.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── styles.css
│   │   └── main.js
│   ├── index.html
└── README.md
```

## Tech Stack
### Frontend:
- React.js (with Vite for fast development)
- Tailwind CSS (for styling)
- Context API (for state management)

### Backend:
- Node.js
- Express.js
- Puppeteer (for web scraping)
- Cheerio (for HTML parsing)

### Database & Authentication:
- MongoDB (with Mongoose)
- JWT Authentication

### Deployment:
- Vercel (Frontend)
- Vercel (Backend)
- MongoDB Atlas (Database)

---

## Getting Started
### Prerequisites
- Node.js 18 or later
- MongoDB Atlas or Local MongoDB instance
- npm or yarn

### Local Development Setup
#### Clone the repository
```sh
git clone https://github.com/aryan55254/scrapesift.git
cd scrapesift
```

#### Install dependencies
```sh
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

#### Set up environment variables
Create a `.env` file in the `backend/` directory and fill it with:
```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```
#### Start the development servers
```sh
# Terminal 1: Start the backend
cd backend
node server.js

# Terminal 2: Start the frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see your application.

---

## Scripts
```sh
# Backend
npm run build     # Build for production
npm start         # Start backend in production

# Frontend
npm run dev       # Start frontend development server
npm run build     # Build frontend for production
npm run preview   # Preview production build
```

---

## Support
For support, email aryanmishra55254@gmail.com or open an issue in the repository.

## License
MIT License
