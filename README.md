🏡 Property Dekho — Real Estate Listing Platform

Property Dekho is a modern full-stack real-estate marketplace where users can browse properties, view locations on an interactive map, bookmark listings, and contact property owners via messaging.

Built with Next.js (App Router), MongoDB, Leaflet Maps, TailwindCSS, and Next-Auth.

✨ Features

🔐 User Authentication

Login / Signup

Google OAuth (optional)

🏠 Property Listings

Detailed property pages

Images gallery & property info

Pagination + filtering

📍 Interactive Maps

Fetches geolocation automatically using Geocoding API

Map rendered with React-Leaflet + OpenStreetMap

⭐ Bookmark System

Save/unsave properties

Personalized dashboard

✉️ Messaging System

Contact property owners

Messages stored and visible in inbox

Delete / read messages

📱 Fully Responsive UI

🧰 Tech Stack
Layer	Technology
Frontend	Next.js (App Router), React, Tailwind CSS
Backend	Next.js Server Actions, Node.js
Auth	Next-Auth
Database	MongoDB + Mongoose
Maps	Leaflet + OpenStreetMap
Deployment	Vercel / Docker (optional)
🚀 Getting Started
1️⃣ Clone Repository
git clone https://github.com/kritul75/property-dekho.git
cd property-dekho

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment

Create .env.local file:

MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_WEATHER_API_KEY=  # if geocoding API is used

4️⃣ Run Development Server
npm run dev


Open the app at:

http://localhost:3000

📂 Folder Structure
property-dekho/
 ├─ app/
 │  ├─ api/
 │  ├─ components/
 │  ├─ properties/
 │  └─ dashboard/
 ├─ models/
 ├─ public/
 ├─ utils/
 └─ README.md

📌 Roadmap

🔍 Advanced search filters (budget, area, furnishing, BHK)

📊 Owner dashboard analytics

🧭 Nearby services using Google Places API

💬 Real-time chat using Socket.io / Pusher

🐛 Issues & Contributions

Found a bug or want a feature?
Feel free to open an issue or submit a PR.

📄 License

MIT License — free to modify and use.

❤️ Built by Kritul

Feel free to connect or suggest improvements!
