# Foodcane — Intelligent Surplus Food Allocation & Rescue

Hackathon-ready full-stack MVP.

## Run
```bash
npm install
npm run install:all
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run seed
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

MongoDB is optional for the demo: if `MONGO_URI` is absent/unavailable, the API uses seeded in-memory demo data so the product still works.

## Demo accounts
- Provider: `restaurant@foodresq.demo` / `demo123`
- NGO: `ngo@foodresq.demo` / `demo123`
- Volunteer: `volunteer@foodresq.demo` / `demo123`

## Map
Set `VITE_GOOGLE_MAPS_API_KEY` to use Google Maps. Without it, Foodcane automatically uses Leaflet + OpenStreetMap.

## Smart allocation
The deterministic engine scores capacity 30%, urgency 25%, distance 20%, availability 15%, compatibility 10%. It intentionally includes a demo case where the nearest NGO cannot accept the full donation, so the farther NGO wins.
