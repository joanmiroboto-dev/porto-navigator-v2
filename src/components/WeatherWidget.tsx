import { useEffect, useState } from 'react';
import { getPortoWeather, WeatherData } from '@/services/weatherService';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Cloud, Droplets, Wind } from 'lucide-react';

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getPortoWeather();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Actualizar cada 30 minutos
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Card className="shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Clima en Oporto
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">{weather.temp}°</span>
              <span className="text-2xl">{weather.icon}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{weather.condition}</p>
          </div>
          <div className="space-y-2 text-right">
            <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              <Droplets className="h-3.5 w-3.5 text-blue-500" />
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              <Wind className="h-3.5 w-3.5 text-cyan-500" />
              <span>{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
