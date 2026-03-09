import { useState } from 'react';
import { DAY_PLANS, PLACES } from '@/data/places';
import { PlaceCard } from '@/components/PlaceCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Itinerary = () => {
  const [activeTab, setActiveTab] = useState(DAY_PLANS[0].date);

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-primary px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-primary-foreground">Itinerario</h1>
        <p className="text-primary-foreground/70 text-sm">5 días en Oporto</p>
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

          {DAY_PLANS.map(day => (
            <TabsContent key={day.date} value={day.date} className="mt-4 space-y-4">
              <h2 className="font-semibold text-foreground">{day.label}</h2>
              {day.places.map(placeId => {
                const place = PLACES.find(p => p.id === placeId);
                if (!place) return null;
                return <PlaceCard key={placeId} place={place} />;
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Itinerary;
