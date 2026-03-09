import { PLACES, DAY_PLANS, EVENTS } from '@/data/places';
import { useTrip } from '@/context/TripContext';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, CalendarDays, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import heroImg from '@/assets/hero-oporto.png';

const Index = () => {
  const { visitedPlaces } = useTrip();
  const navigate = useNavigate();

  const uniquePlaceIds = new Set(DAY_PLANS.flatMap(d => d.places));
  const totalPlaces = uniquePlaceIds.size;
  const visitedCount = [...uniquePlaceIds].filter(id => visitedPlaces.has(id)).length;
  const progress = totalPlaces > 0 ? (visitedCount / totalPlaces) * 100 : 0;

  // Find today's or next plan
  const today = new Date().toISOString().slice(0, 10);
  const currentDay = DAY_PLANS.find(d => d.date >= today) || DAY_PLANS[0];

  // Upcoming events (next 2)
  const upcomingEvents = EVENTS.filter(e => e.date >= (currentDay?.date || today)).slice(0, 2);

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary px-6 pb-12 pt-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/10" />
        </div>
        <div className="relative">
          <p className="text-primary-foreground/70 text-sm font-medium uppercase tracking-wider">
            Tu viaje a
          </p>
          <h1 className="text-4xl font-extrabold text-primary-foreground tracking-tight">
            Oporto
          </h1>
          <p className="mt-1 text-primary-foreground/80 flex items-center gap-1.5 text-sm">
            <CalendarDays className="h-4 w-4" />
            18 – 22 de marzo, 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 -mt-6 space-y-5">
        {/* Progress Card */}
        <Card className="shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">Progreso del viaje</span>
              <span className="text-sm font-bold text-primary">{visitedCount}/{totalPlaces}</span>
            </div>
            <Progress value={progress} className="h-2.5" />
            <p className="mt-2 text-xs text-muted-foreground">
              {visitedCount === totalPlaces
                ? '🎉 ¡Has completado todos los lugares!'
                : `Te faltan ${totalPlaces - visitedCount} lugares por visitar`}
            </p>
          </CardContent>
        </Card>

        {/* Next Plan Card */}
        <button
          onClick={() => navigate('/itinerario')}
          className="w-full text-left"
        >
          <Card className="shadow-md hover:shadow-lg transition-shadow border-accent/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-accent uppercase tracking-wider">
                    Siguiente plan
                  </p>
                  <p className="mt-1 font-semibold text-foreground">{currentDay.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {currentDay.places.length} lugares · {currentDay.subtitle}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-accent" />
              </div>
            </CardContent>
          </Card>
        </button>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-accent" />
              Próximos eventos
            </h2>
            <div className="space-y-2">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="shadow-sm border-accent/10">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{event.name}</p>
                        <p className="text-xs text-muted-foreground">{event.dateLabel} · {event.location}</p>
                      </div>
                      {event.price && (
                        <Badge variant="outline" className="shrink-0 text-[10px] border-accent/30 text-accent">
                          {event.price}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {([
            { label: 'Ver', count: PLACES.filter(p => p.category === 'ver').length, icon: '🏛️' },
            { label: 'Hacer', count: PLACES.filter(p => p.category === 'hacer').length, icon: '🚢' },
            { label: 'Comer', count: PLACES.filter(p => p.category === 'comer').length, icon: '🍽️' },
          ] as const).map(stat => (
            <Card key={stat.label} className="shadow-sm">
              <CardContent className="p-4 text-center">
                <span className="text-2xl">{stat.icon}</span>
                <p className="mt-1 text-lg font-bold text-foreground">{stat.count}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Places overview */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Lugares destacados
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
            {PLACES.slice(0, 8).map(place => (
              <div
                key={place.id}
                className="shrink-0 w-36 snap-start"
              >
                <div className="relative h-24 rounded-xl overflow-hidden">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-1.5 text-xs font-medium text-foreground truncate">{place.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
