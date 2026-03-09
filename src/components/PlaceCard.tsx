import { Place, CATEGORY_CONFIG } from '@/data/places';
import { useTrip } from '@/context/TripContext';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Check } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const { isVisited, toggleVisited } = useTrip();
  const visited = isVisited(place.id);
  const cat = CATEGORY_CONFIG[place.category];

  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all ${
        visited ? 'opacity-75 ring-2 ring-green-500/30' : ''
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <Badge className={`absolute top-3 left-3 ${cat.color} border-0`}>
          {cat.label}
        </Badge>
        {visited && (
          <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground leading-tight">{place.name}</h3>
          <Checkbox
            checked={visited}
            onCheckedChange={() => toggleVisited(place.id)}
            className="mt-0.5 shrink-0"
            aria-label={`Marcar ${place.name} como visitado`}
          />
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{place.description}</p>
        {place.tip && (
          <p className="mt-2 flex items-center gap-1 text-xs text-accent font-medium">
            <MapPin className="h-3 w-3" />
            {place.tip}
          </p>
        )}
        {place.priceRange && (
          <p className="mt-1 text-[11px] text-muted-foreground font-medium">
            💰 {place.priceRange}
          </p>
        )}
      </div>
    </div>
  );
}
