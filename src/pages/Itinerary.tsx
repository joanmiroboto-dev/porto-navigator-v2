import { useState } from 'react';
import { DAY_PLANS, PLACES, EVENTS, TRANSPORT_OPTIONS, WINE_TIPS } from '@/data/places';
import { PlaceCard } from '@/components/PlaceCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Lightbulb, Train, Wine, Sparkles } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Itinerary = () => {
  const [activeTab, setActiveTab] = useState(DAY_PLANS[0].date);
  const [showTransport, setShowTransport] = useState(false);
  const [showWine, setShowWine] = useState(false);

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-primary px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-primary-foreground">Itinerario</h1>
        <p className="text-primary-foreground/70 text-sm">5 días en Oporto · Marzo 2026</p>
      </div>

      <div className="mx-auto max-w-lg px-4 mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-5 h-auto">
            {DAY_PLANS.map(day => (
              <TabsTrigger
                key={day.date}
                value={day.date}
                className="text-xs py-2 px-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {day.date.slice(8)}
                <br />
                <span className="text-[10px] opacity-70">Mar</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {DAY_PLANS.map(day => {
            const dayEvents = day.events
              ? EVENTS.filter(e => day.events!.includes(e.id))
              : [];

            return (
              <TabsContent key={day.date} value={day.date} className="mt-4 space-y-4">
                <div>
                  <h2 className="font-semibold text-foreground">{day.label}</h2>
                  <p className="text-sm text-muted-foreground">{day.subtitle}</p>
                </div>

                {/* Eventos del día */}
                {dayEvents.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-accent uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Eventos del día
                    </h3>
                    {dayEvents.map(event => (
                      <Card key={event.id} className="border-accent/20 bg-accent/5">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-foreground">{event.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{event.location}</p>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                            </div>
                            {event.price && (
                              <Badge variant="outline" className="shrink-0 text-[10px] border-accent/30 text-accent">
                                {event.price}
                              </Badge>
                            )}
                          </div>
                          {event.relevance && (
                            <p className="mt-2 text-xs text-accent font-medium">{event.relevance}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Tips del día */}
                {day.tips && day.tips.length > 0 && (
                  <Card className="border-primary/10 bg-primary/5">
                    <CardContent className="p-3">
                      <h3 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Lightbulb className="h-3.5 w-3.5" />
                        Tips del día
                      </h3>
                      <ul className="space-y-1">
                        {day.tips.map((tip, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <span className="text-primary mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Lugares */}
                {day.places.map(placeId => {
                  const place = PLACES.find(p => p.id === placeId);
                  if (!place) return null;
                  return <PlaceCard key={placeId} place={place} />;
                })}
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Secciones extras */}
        <div className="mt-8 space-y-2">
          <Accordion type="multiple">
            <AccordionItem value="transport">
              <AccordionTrigger className="text-sm">
                <span className="flex items-center gap-2">
                  <Train className="h-4 w-4 text-primary" />
                  Transporte en Oporto
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {TRANSPORT_OPTIONS.map((opt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 text-[10px] mt-0.5">
                        {opt.price}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium text-foreground">{opt.name}</p>
                        <p className="text-xs text-muted-foreground">{opt.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="wine">
              <AccordionTrigger className="text-sm">
                <span className="flex items-center gap-2">
                  <Wine className="h-4 w-4 text-accent" />
                  Guía de Vinos de Oporto
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {WINE_TIPS.map((wine, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold text-foreground">{wine.type}</p>
                      <p className="text-xs text-muted-foreground">{wine.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
