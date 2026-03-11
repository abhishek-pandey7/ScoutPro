# ScoutPro: Football Performance Analytics

![ScoutPro Logo](https://img.shields.io/badge/ScoutPro-Analytics-0f172a?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

ScoutPro is a premium, beautifully designed football analytics application that allows users to search for players and view highly detailed statistical breakdowns of their performance across different seasons and leagues. 

---

## Key Features

* **Advanced Search Interface**: Clean, minimalist search bar with integrated loading states and dynamic season selection.
* **Premium Brutalist-Inspired UI**: Flat, analytical light theme avoiding emojis and favoring crisp layout, shadows, and clear typography.
* **Dynamic Performance Indicators**: Stats are dynamically evaluated and color-coded (Red/Yellow/Green) to indicate performance quality based on predefined maximums.
* **Real-time API Integration**: Fetches real-time, authentic data (including team and league logos) using the robust API-Sports Football API.
* **Custom SVG Animations**: Features a custom rotating football SVG for loading states to maintain theme immersion.

---

## Tech Stack

* **Frontend Framework**: React 18
* **Styling**: Tailwind CSS v3 (Custom Animations & Keyframes)
* **Build Tool**: Vite
* **Data Provider**: [API-Sports Football API v3](https://www.api-football.com/)

---

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine. You will also need an active API key from [API-Sports](https://dashboard.api-football.com/register).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/scout-pro.git
   cd scout-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   *(or `yarn`, `pnpm`, etc.)*

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your API-Sports key:
   ```env
   VITE_API_KEY=your_api_key_here
   ```
   *(Note: The `.env` file is included in `.gitignore` by default to keep your credentials secure).*

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open the App**
   Navigate to `http://localhost:5173/` in your browser.


---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/scout-pro/issues).

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
