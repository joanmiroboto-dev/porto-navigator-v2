import { PLACES, DAY_PLANS, EVENTS } from '@/data/places';
import { useTrip } from '@/context/TripContext';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, CalendarDays, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import heroImg from '@/assets/hero-oporto.png';
import { TripStats } from '@/components/TripStats';
import { WeatherWidget } from '@/components/WeatherWidget';
import { Recommendations } from '@/components/Recommendations';
import { ShareItinerary } from '@/components/ShareItinerary';

const Index = () => {
  const { visitedPlaces } = useTrip();
  const navigate = useNavigate();

  const uniquePlaceIds = new Set(DAY_PLANS.flatMap((d) => d.places));
  const totalPlaces = uniquePlaceIds.size;
  const visitedCount = [...uniquePlaceIds].filter((id) => visitedPlaces.has(id)).length;
  const progress = totalPlaces > 0 ? visitedCount / totalPlaces * 100 : 0;

  // Find today's or next plan
  const today = new Date().toISOString().slice(0, 10);
  const currentDay = DAY_PLANS.find((d) => d.date >= today) || DAY_PLANS[0];

  // Upcoming events (next 2)
  const upcomingEvents = EVENTS.filter((e) => e.date >= (currentDay?.date || today)).slice(0, 2);

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
    <div className="min-h-screen pb-24">
      {/* Hero Section - Mejorado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden min-h-[700px] group"
      >
        <img
          src={heroImg}
          alt="Pareja en Oporto con el puente Dom Luís al fondo"
          className="absolute inset-0 h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative flex h-full flex-col justify-end px-6 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-medium uppercase tracking-wider text-red-400 text-xl">
              Pasear nuestro amor por
            </p>
            <h1 className="tracking-tight drop-shadow-lg text-white text-5xl font-bold text-left mt-2">
              Oporto
            </h1>
            <p className="mt-3 text-white/90 flex items-center gap-1.5 text-sm">
              <CalendarDays className="h-4 w-4" />
              18 – 22 de marzo, 2026
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-lg px-4 -mt-6 space-y-5"
      >
        {/* Weather Widget */}
        <motion.div variants={item}>
          <WeatherWidget />
        </motion.div>

        {/* Progress Card - Mejorado */}
        <motion.div variants={item}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Progreso del viaje
                </span>
                <span className="text-sm font-bold text-primary">{visitedCount}/{totalPlaces}</span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="mt-3 text-xs text-muted-foreground">
                {visitedCount === totalPlaces
                  ? '🎉 ¡Has completado todos los lugares!'
                  : `Te faltan ${totalPlaces - visitedCount} lugares por visitar`}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item}>
          <TripStats />
        </motion.div>

        {/* Next Plan Card - Mejorado */}
        <motion.div variants={item}>
          <button
            onClick={() => navigate('/itinerario')}
            className="w-full text-left"
          >
            <Card className="shadow-md hover:shadow-lg transition-all hover:scale-[1.02] border-accent/20">
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
        </motion.div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <motion.div variants={item}>
            <div>
              <h2 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-accent" />
                Próximos eventos
              </h2>
              <div className="space-y-2">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="shadow-sm border-accent/10 hover:shadow-md transition-shadow">
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
          </motion.div>
        )}

        {/* Places overview - Mejorado */}
        <motion.div variants={item}>
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Lugares destacados
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
              {PLACES.slice(0, 8).map((place, idx) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="shrink-0 w-36 snap-start"
                >
                  <div className="relative h-24 rounded-xl overflow-hidden group cursor-pointer">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-foreground truncate">{place.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div variants={item}>
          <Recommendations />
        </motion.div>

        {/* Share Button */}
        <motion.div variants={item} className="flex justify-center pt-2">
          <ShareItinerary />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
