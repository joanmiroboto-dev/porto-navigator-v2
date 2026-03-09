import { useRef, useState } from 'react';
import { Place, CATEGORY_CONFIG } from '@/data/places';
import { useTrip } from '@/context/TripContext';
import { usePlacePhotos } from '@/hooks/use-place-photos';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  MapPin,
  Check,
  StickyNote,
  ChevronDown,
  ChevronUp,
  Camera,
  ImagePlus,
  X,
} from 'lucide-react';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const { isVisited, toggleVisited, getNote, setNote } = useTrip();
  const { photos, addPhoto, removePhoto } = usePlacePhotos(place.id);
  const visited = isVisited(place.id);
  const cat = CATEGORY_CONFIG[place.category];
  const currentNote = getNote(place.id);
  const [showNotes, setShowNotes] = useState(false);
  const [draft, setDraft] = useState(currentNote);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      await addPhoto(files[i]);
    }
    e.target.value = '';
  };

  return (
    <>
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
          {photos.length > 0 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white font-medium">
              <Camera className="h-3 w-3" />
              {photos.length}
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

          {/* User photos */}
          {photos.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
              {photos.map(photo => (
                <button
                  key={photo.id}
                  onClick={() => setLightboxPhoto(photo.id)}
                  className="shrink-0 snap-start group relative"
                >
                  <img
                    src={photo.dataUrl}
                    alt="Tu foto"
                    className="h-16 w-16 rounded-lg object-cover ring-1 ring-border"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Action buttons row */}
          <div className="mt-3 flex items-center gap-2">
            {/* Camera button */}
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <Camera className="h-3.5 w-3.5" />
              <span className="hidden min-[380px]:inline">Hazte una foto</span>
              <span className="min-[380px]:hidden">Foto</span>
            </button>

            {/* Gallery upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <ImagePlus className="h-3.5 w-3.5" />
              <span className="hidden min-[380px]:inline">Galería</span>
            </button>

            {/* Notes toggle */}
            <button
              onClick={handleToggleNotes}
              className="ml-auto flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <StickyNote className="h-3.5 w-3.5" />
              {currentNote ? (
                <span className="truncate max-w-[80px] text-muted-foreground font-normal">
                  {currentNote}
                </span>
              ) : (
                'Nota'
              )}
              {showNotes ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          </div>

          {/* Hidden file inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

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

      {/* Lightbox dialog */}
      <Dialog open={!!lightboxPhoto} onOpenChange={() => setLightboxPhoto(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 sm:p-4 bg-black/95 border-none">
          <DialogTitle className="sr-only">Foto de {place.name}</DialogTitle>
          {lightboxPhoto && (() => {
            const photo = photos.find(p => p.id === lightboxPhoto);
            if (!photo) return null;
            return (
              <div className="relative flex flex-col items-center">
                <img
                  src={photo.dataUrl}
                  alt={`Tu foto en ${place.name}`}
                  className="max-h-[75vh] w-auto rounded-lg object-contain"
                />
                <div className="mt-3 flex items-center gap-3">
                  <p className="text-xs text-white/60">
                    {new Date(photo.timestamp).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <button
                    onClick={() => {
                      removePhoto(photo.id);
                      setLightboxPhoto(null);
                    }}
                    className="flex items-center gap-1 rounded-md bg-destructive/20 px-2.5 py-1 text-xs text-destructive hover:bg-destructive/30 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </>
  );
}
