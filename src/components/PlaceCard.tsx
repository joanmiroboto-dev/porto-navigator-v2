import { useState } from 'react';
import { Place, CATEGORY_CONFIG } from '@/data/places';
import { useTrip } from '@/context/TripContext';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Check, StickyNote, ChevronDown, ChevronUp } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const { isVisited, toggleVisited, getNote, setNote } = useTrip();
  const visited = isVisited(place.id);
  const cat = CATEGORY_CONFIG[place.category];
  const currentNote = getNote(place.id);
  const [showNotes, setShowNotes] = useState(false);
  const [draft, setDraft] = useState(currentNote);

  const handleToggleNotes = () => {
    if (showNotes && draft !== currentNote) {
      setNote(place.id, draft);
    }
    setShowNotes(!showNotes);
  };

  const handleBlur = () => {
    if (draft !== currentNote) {
      setNote(place.id, draft);
    }
  };

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

        {/* Notes toggle */}
        <button
          onClick={handleToggleNotes}
          className="mt-3 flex w-full items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <StickyNote className="h-3.5 w-3.5" />
          {currentNote ? 'Tu nota' : 'Añadir nota'}
          {currentNote && !showNotes && (
            <span className="ml-1 text-muted-foreground font-normal truncate max-w-[150px]">
              – {currentNote}
            </span>
          )}
          {showNotes ? (
            <ChevronUp className="h-3 w-3 ml-auto" />
          ) : (
            <ChevronDown className="h-3 w-3 ml-auto" />
          )}
        </button>

        {showNotes && (
          <div className="mt-2">
            <Textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onBlur={handleBlur}
              placeholder="Escribe tus tips, recordatorios u observaciones..."
              className="min-h-[72px] text-sm resize-none"
              rows={3}
            />
            {draft !== currentNote && (
              <p className="mt-1 text-[10px] text-muted-foreground">Se guarda automáticamente al cerrar</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
