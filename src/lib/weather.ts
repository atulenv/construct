// Simple weather helper with a placeholder fetch function.
// Replace the API_URL and add an API key in production.

export async function fetchWeatherForCoords(lat: number, lon: number) {
  try {
    // Placeholder response to avoid network dependency in sample code.
    return {
      temperature: '22°C',
      condition: 'Partly Cloudy',
      icon: 'cloudy-outline',
      alert: null,
    };
  } catch (err) {
    console.warn('Weather fetch failed', err);
    return { temperature: '--', condition: 'Unknown', icon: 'cloud-offline-outline', alert: null };
  }
}

// transformWeather would map provider response to our UI shape.
