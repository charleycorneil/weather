# live links

- github: https://github.com/charleycorneil/weather
- web4:https://in-info-web4.luddy.indianapolis.iu.edu/~chelcorn/weather/

# WeatherNow — Quick README

- **What it is:** A simple weather app for N423 that fetches JSON from WeatherAPI and shows **Current**, **Forecast (1–3 days)**, and **Today’s Hourly** data.

- **Tech:** HTML, SCSS (compiled to CSS), JavaScript (ES modules), WeatherAPI.

- **Folder structure:**

  - `index.html` – page & navbar (Login/Sign Up buttons included)
  - `css/styles.scss` → compiled to `css/styles.css`
  - `model/model.js` – fetches WeatherAPI forecast JSON
  - `app/app.js` – handles UI, form submit, and rendering

- **Setup:**

  1. Get an API key at https://www.weatherapi.com
  2. In `app/app.js`, set `const API_KEY = "YOUR_KEY"`
  3. (If needed) Add allowed referrers in WeatherAPI dashboard:
     `http://localhost`, `http://127.0.0.1`, and your Web4 URL.

- **Run locally:**  
  Open `index.html` with VS Code **Live Server** (or double-click for a quick test).

- **Use it:**  
  Enter **city or ZIP** (e.g., `Indianapolis` or `46202`) → choose **Days (1–3)** → **Get Weather**.  
  Dates show as **“Month DD, YYYY.”**

- **Styling:**  
  SCSS with pale **sage/olive** theme and soft yellow accents; larger headings/nav for readability.

- **Meets rubric:**

  - Retrieves JSON from API and displays >80% of fields
  - ZIP code works
  - Professional styling with SCSS
  - Login & Sign Up buttons in nav
  - GitHub + Web4 links provided

- **Deploy:**  
  Upload the entire `weather/` folder to Web4. Share both **Web4 URL** and **GitHub repo**.

- **Troubleshooting:**  
  If you see `API key is invalid (2006)`, recheck key, hard refresh, or add Web4 domain to allowed referrers.
