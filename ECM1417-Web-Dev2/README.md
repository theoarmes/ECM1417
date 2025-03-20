# README - Pairs Game Web Application

## Features Implemented

### **1. Landing Page (index.php)**
- Displays a welcome message if the user is registered.
- Provides a button to start the game (`Click here to play`).
- Displays a registration prompt if the user is not registered (`Register now`).
- Fully responsive design with a **navbar menu**.
- Navbar includes **Home, Play Pairs, Leaderboard (if registered), and Register options**.
- Uses **Verdana (12px, bold)** for the navbar.

### **2. Registration Page (registration.php & registration.js)**
- Implements user profile registration.
- Validates username to prevent special characters.
- Generates an **avatar selection**:
  - **Complex Mode:** Users can customize emoji avatars.
- Saves user profile using **cookies and session variables**.
- Avatar is displayed in the **navbar** after registration.

### **3. Pairs Game Page (pairs.php & game.js)**
- Implements **three game modes**:
  - **Simple:** 6 cards.
  - **Medium:** 10 cards.
  - **Complex:** Progressive levels with increasing difficulty.
- Uses **randomized shuffling** for game generation.
- Players flip cards to match pairs (or groups in complex mode).
- Implements a **score tracking system**:
  - Tracks **time taken, total points and points per level**.
  - Updates high score dynamically and stores it in **localStorage**.
  - Changes **background to gold (#FFD700)** if a high score is beaten.
- Allows players to **submit scores or replay**.
- Includes **game animations** (flipping and hover).

### **4. Leaderboard Page (leaderboard.php)**
- Displays **top scores**.
- Uses a structured **table layout**:
  - **Grey background**.
  - **Table headers are blue with 2px spacing**.

## Deployment & Access
- Hosted on **Microsoft Azure VM** with a configured **LAMP stack**.
- Accessible via the provided **"http://ml-lab-4d78f073-aa49-4f0e-bce2-31e5254052c7.ukwest.cloudapp.azure.com:58061/ECM1417-Web-Dev2/public_html/pairs.php"**.

## Notes
- The leaderboard persists across different users by handling **multiple browser sessions**.

