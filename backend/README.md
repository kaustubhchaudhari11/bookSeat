**Seats Booking Application**


This project is a responsive seats booking application built with Next.js, Node.js, and PostgreSQL. Users can book up to 7 seats at a time, with priority given to booking seats in the same row. The app ensures that no two users can reserve the same seat simultaneously

Features
**User authentication (Sign Up, Log In, and Log Out).
Real-time seat reservation system.
Responsive design for all screen sizes.
Integration with PostgreSQL for seat data management.
Notifications for successful or failed seat bookings.
Reset booking functionality.****

**Tech Stack
Frontend: Next.js, Tailwind CSS
Backend: Node.js, Express.js
Database: PostgreSQL
Deployment: Netlify (Frontend), TBD (Backend)**

Setup Instructions
1. Prerequisites
Node.js installed (v16 or higher).
PostgreSQL installed and running.

2. Clone the Repository
   git clone https://github.com/kaustubhchaudahri11/sde1_assignment.git
   cd sde1_assignment

3 Install dependencies:
  npm install

4 Connect the your postgres Database

5) Run Devlopemenet server:
   Npm run dev

  **        #API DOCUMENTATION#**
1. Fetch Seats
Endpoint: GET /api/seats
Description: Fetches all seats with their reservation status.


2. Book Seats
Endpoint: POST /api/seats/book
Description: Reserves seats for the user.


3. Reset Bookings
Endpoint: POST /api/seats/reset
Description: Resets all seat reservations.


4. User Authentication
Sign Up: POST /api/auth/signup
Log In: POST /api/auth/login

