import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PLACES, CATEGORY_CONFIG } from '@/data/places';
import { useTrip } from '@/context/TripContext';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function createColoredIcon(color: string) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background: ${color};
      width: 28px;
      height: 28px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

const MapView = () => {
  const { isVisited, toggleVisited } = useTrip();

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-primary px-6 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-primary-foreground">Mapa</h1>
        <div className="flex gap-3 mt-2">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div
                className="h-3 w-3 rounded-full"
                style={{ background: cfg.mapColor }}
              />
              <span className="text-xs text-primary-foreground/80">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[calc(100vh-180px)]">
        <MapContainer
          center={[41.1435, -8.6118]}
          zoom={14}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {PLACES.map(place => {
            const cat = CATEGORY_CONFIG[place.category];
            return (
              <Marker
                key={place.id}
                position={[place.lat, place.lng]}
                icon={createColoredIcon(cat.mapColor)}
              >
                <Popup>
                  <div className="min-w-[180px]">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-full h-24 object-cover rounded-md mb-2"
                    />
                    <h3 className="font-semibold text-sm">{place.name}</h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{place.description}</p>
                    <button
                      onClick={() => toggleVisited(place.id)}
                      className={`mt-2 w-full text-xs py-1.5 rounded-md font-medium transition-colors ${
                        isVisited(place.id)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {isVisited(place.id) ? '✓ Visitado' : 'Marcar visitado'}
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
