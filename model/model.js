// model/model.js
export async function fetchForecast({ key, query, days }) {
  const url = new URL("https://api.weatherapi.com/v1/forecast.json");
  url.searchParams.set("key", key);
  url.searchParams.set("q", query); // city or ZIP works
  url.searchParams.set("days", days); // free plan: up to 3
  url.searchParams.set("aqi", "no");
  url.searchParams.set("alerts", "no");

  const res = await fetch(url.href);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}
