import { useMemo } from 'react';
import { useTripStore } from '@/store/tripStore';
import { useTrip } from '@/context/TripContext';
import { PLACES } from '@/data/places';
import { PlaceCard } from '@/components/PlaceCard';
import { SearchAndFilters } from '@/components/SearchAndFilters';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const { searchQuery, selectedCategories, priceFilter } = useTripStore();
  const { visitedPlaces } = useTrip();

  const filteredPlaces = useMemo(() => {
    return PLACES.filter((place) => {
      // Filtro de búsqueda
      const matchesSearch =
        !searchQuery ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtro de categoría
      const matchesCategory = selectedCategories.includes(place.category);

      // Filtro de precio
      let matchesPrice = true;
      if (priceFilter !== 'all') {
        if (priceFilter === 'free') {
          matchesPrice = !place.priceRange;
        } else if (priceFilter === 'budget') {
          matchesPrice =
            place.priceRange &&
            (place.priceRange.includes('€') ||
              place.priceRange.includes('20') ||
              place.priceRange.includes('25'));
        } else if (priceFilter === 'expensive') {
          matchesPrice =
            place.priceRange &&
            !place.priceRange.includes('20') &&
            !place.priceRange.includes('25');
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategories, priceFilter]);

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-primary px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-primary-foreground">Buscar</h1>
        <p className="text-primary-foreground/70 text-sm">
          Encuentra los mejores lugares de Oporto
        </p>
      </div>

      <div className="mx-auto max-w-lg px-4 mt-4 space-y-4">
        <SearchAndFilters />

        {/* Results */}
        {filteredPlaces.length > 0 ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {filteredPlaces.length} lugar{filteredPlaces.length !== 1 ? 'es' : ''} encontrado
              {filteredPlaces.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-3">
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        ) : (
          <Card className="shadow-sm border-dashed">
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-1">
                No se encontraron lugares
              </p>
              <p className="text-sm text-muted-foreground">
                Intenta con otros filtros o palabras clave
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
