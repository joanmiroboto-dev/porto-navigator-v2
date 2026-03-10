import { useMemo } from 'react';
import { useTrip } from '@/context/TripContext';
import { PLACES, PlaceCategory } from '@/data/places';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Recommendations() {
  const { visitedPlaces } = useTrip();

  const recommendations = useMemo(() => {
    // Analizar categorías visitadas
    const visitedByCategory: Record<PlaceCategory, number> = {
      ver: 0,
      hacer: 0,
      comer: 0,
    };

    Array.from(visitedPlaces).forEach((placeId) => {
      const place = PLACES.find((p) => p.id === placeId);
      if (place) {
        visitedByCategory[place.category]++;
      }
    });

    // Encontrar categoría menos explorada
    const leastExplored = Object.entries(visitedByCategory).sort(
      ([, a], [, b]) => a - b
    )[0]?.[0] as PlaceCategory | undefined;

    // Obtener recomendaciones de la categoría menos explorada
    if (!leastExplored) {
      return PLACES.slice(0, 3);
    }

    const unvisitedInCategory = PLACES.filter(
      (p) => p.category === leastExplored && !visitedPlaces.has(p.id)
    );

    return unvisitedInCategory.slice(0, 3);
  }, [visitedPlaces]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-amber-500" />
        <h3 className="text-sm font-semibold text-foreground">
          Recomendaciones para ti
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-2"
      >
        {recommendations.map((place, index) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="h-16 w-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-sm text-foreground line-clamp-1">
                          {place.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                          {place.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <Badge variant="outline" className="text-[10px]">
                        {place.category === 'ver'
                          ? '🏛️'
                          : place.category === 'hacer'
                            ? '🚢'
                            : '🍽️'}{' '}
                        {place.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
