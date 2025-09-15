import { fetchForecast } from "../model/model.js";

const API_KEY = "50d869f86ea94168ac4155035251509";
const DEFAULT_CITY = "Indianapolis";
const DEFAULT_DAYS = 3;

const $ = (s) => document.querySelector(s);
const form = $("#searchForm");
const inputLocation = $("#location");
const selectDays = $("#days");
const btnGo = $("#go");

const currentEl = $("#current");
const forecastGridEl = $("#forecastGrid");
const hourlyGridEl = $("#hourlyGrid");

const longDateFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "2-digit",
  year: "numeric",
});
function formatISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return longDateFmt.format(new Date(y, m - 1, d));
}
const iconUrl = (path) =>
  path?.startsWith("//") ? "https:" + path : path || "";
const F = (x) => Math.round(Number(x));
const mph = (x) => `${x} mph`;

function renderCurrent(data) {
  const { location, current } = data;
  currentEl.innerHTML = `
    <div class="current-wrap panel">
      <div class="meta">
        <h3>${location.name}, ${location.region || location.country}</h3>
        <p class="coords">Local time: ${location.localtime} • Lat ${
    location.lat
  } • Lon ${location.lon} • TZ ${location.tz_id}</p>
      </div>
      <div class="temp-row">
        <img alt="${current.condition.text}" src="${iconUrl(
    current.condition.icon
  )}">
        <div class="temp">${F(current.temp_f)}°F</div>
        <div class="cond">${current.condition.text}</div>
      </div>
      <ul class="stats">
        <li>Feels like: ${F(current.feelslike_f)}°F</li>
        <li>Humidity: ${current.humidity}%</li>
        <li>Cloud: ${current.cloud}%</li>
        <li>Wind: ${mph(current.wind_mph)} ${current.wind_dir} (${
    current.wind_degree
  }°)</li>
        <li>Gusts: ${mph(current.gust_mph)}</li>
        <li>Pressure: ${current.pressure_in} in</li>
        <li>Precip: ${current.precip_in} in</li>
        <li>Visibility: ${current.vis_miles} mi</li>
        <li>UV Index: ${current.uv}</li>
      </ul>
    </div>
  `;
}

function renderForecast(data) {
  const days = data.forecast?.forecastday || [];
  forecastGridEl.innerHTML = days
    .map((d) => {
      const day = d.day;
      const astro = d.astro;
      return `
      <article class="card">
        <h4>${formatISODate(d.date)}</h4>
        <div class="top">
          <img alt="${day.condition.text}" src="${iconUrl(day.condition.icon)}">
          <div>
            <div class="hi-lo">${F(day.maxtemp_f)}° / ${F(
        day.mintemp_f
      )}°F</div>
            <div class="cond">${day.condition.text}</div>
          </div>
        </div>
        <ul class="list">
          <li>Avg Temp: ${F(day.avgtemp_f)}°F</li>
          <li>Humidity: ${day.avghumidity}%</li>
          <li>Chance of Rain: ${day.daily_chance_of_rain}%</li>
          <li>Chance of Snow: ${day.daily_chance_of_snow}%</li>
          <li>Max Wind: ${mph(day.maxwind_mph)}</li>
          <li>Precip: ${day.totalprecip_in} in</li>
          <li>UV: ${day.uv}</li>
          <li>Sunrise: ${astro.sunrise}</li>
          <li>Sunset: ${astro.sunset}</li>
          <li>Moon: ${astro.moon_phase} • ${astro.moon_illumination}%</li>
        </ul>
      </article>
    `;
    })
    .join("");
}

function renderHourly(data) {
  const today = data.forecast?.forecastday?.[0];
  if (!today) {
    hourlyGridEl.innerHTML = "";
    return;
  }
  hourlyGridEl.innerHTML = today.hour
    .map((h) => {
      const timeLabel = h.time.split(" ")[1];
      return `
      <article class="card hour">
        <h5>${timeLabel}</h5>
        <img alt="${h.condition.text}" src="${iconUrl(h.condition.icon)}">
        <div class="temp">${F(h.temp_f)}°F</div>
        <div class="cond">${h.condition.text}</div>
        <div class="meta">Wind ${mph(h.wind_mph)} • Humidity ${
        h.humidity
      }% • UV ${h.uv} • Chance of rain ${h.chance_of_rain}%</div>
      </article>
    `;
    })
    .join("");
}

async function loadWeather(query = DEFAULT_CITY, days = DEFAULT_DAYS) {
  btnGo.disabled = true;
  const oldText = btnGo.textContent;
  btnGo.textContent = "Loading…";
  try {
    const data = await fetchForecast({ key: API_KEY, query, days });
    renderCurrent(data);
    renderForecast(data);
    renderHourly(data);
  } catch (err) {
    console.error(err);
    currentEl.innerHTML = `<div class="error">⚠️ ${
      err.message || "Failed to load weather."
    }</div>`;
    forecastGridEl.innerHTML = "";
    hourlyGridEl.innerHTML = "";
  } finally {
    btnGo.disabled = false;
    btnGo.textContent = oldText;
  }
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = inputLocation.value.trim() || DEFAULT_CITY;
  const d = Number(selectDays.value || DEFAULT_DAYS);
  loadWeather(q, d);
});

window.addEventListener("DOMContentLoaded", () => {
  if (inputLocation && !inputLocation.value) inputLocation.value = DEFAULT_CITY;
  if (selectDays && !selectDays.value) selectDays.value = String(DEFAULT_DAYS);
  loadWeather(DEFAULT_CITY, DEFAULT_DAYS);
});
