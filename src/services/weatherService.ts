export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

// Mock weather data - en producción usarías una API real como OpenWeatherMap
const mockWeatherData: WeatherData = {
  temp: 18,
  condition: 'Parcialmente nublado',
  humidity: 65,
  windSpeed: 12,
  icon: '⛅',
};

export async function getPortoWeather(): Promise<WeatherData> {
  // Simular delay de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeatherData);
    }, 500);
  });
}

// En producción, implementarías algo como:
/*
export async function getPortoWeather(): Promise<WeatherData> {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Porto&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    icon: getWeatherIcon(data.weather[0].main),
  };
}

function getWeatherIcon(condition: string): string {
  const icons: Record<string, string> = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
  };
  return icons[condition] || '🌤️';
}
*/
