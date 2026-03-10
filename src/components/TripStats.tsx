import { useTrip } from '@/context/TripContext';
import { PLACES, DAY_PLANS } from '@/data/places';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { MapPin, Camera, BookmarkIcon, TrendingUp } from 'lucide-react';

export function TripStats() {
  const { visitedPlaces } = useTrip();

  const uniquePlaceIds = new Set(DAY_PLANS.flatMap((d) => d.places));
  const totalPlaces = uniquePlaceIds.size;
  const visitedCount = [...uniquePlaceIds].filter((id) => visitedPlaces.has(id)).length;
  const progress = totalPlaces > 0 ? (visitedCount / totalPlaces) * 100 : 0;

  const stats = [
    {
      label: 'Lugares visitados',
      value: visitedCount,
      total: totalPlaces,
      icon: MapPin,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      label: 'Categorías',
      value: 3,
      total: 3,
      icon: BookmarkIcon,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950',
    },
    {
      label: 'Progreso',
      value: Math.round(progress),
      total: 100,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
      suffix: '%',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 gap-3"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div key={stat.label} variants={item}>
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className={`p-4 text-center ${stat.bgColor} rounded-lg`}>
                <Icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                <p className="text-lg font-bold text-foreground">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {stat.label}
                </p>
                {stat.total > 1 && stat.suffix !== '%' && (
                  <p className="text-[9px] text-muted-foreground mt-0.5">
                    de {stat.total}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
