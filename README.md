# ScrapeSift
An web scraper that extracts text, images, and links from public websites with ease.

## Watch the Demo on YouTube

## Key Features
✅ Extracts Text, Images, and Links from Any Webpage  
⚡ Fast and Efficient Scraping with Puppeteer  
🔄 Real-time Data Extraction  
🔒 Secure Authentication with JWT  
📱 User-Friendly Dashboard  

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
git clone https://github.com/aryanmishra2005/scrapesift.git
cd scrapesift
```

#### Install dependencies
```sh
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

#### Set up environment variables
Create a `.env` file in the `server/` directory and fill it with:
```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

For the frontend, create a `.env` file in the `client/` directory:
```env
VITE_API_BASE_URL=http://localhost:5000
```

#### Start the development servers
```sh
# Terminal 1: Start the backend
cd server
npm run dev

# Terminal 2: Start the frontend
cd client
npm run dev
```
Visit `http://localhost:5173` to see your application.

---

## Scripts
```sh
# Backend
npm run dev       # Start backend in development mode
npm run build     # Build for production
npm start        # Start backend in production

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

