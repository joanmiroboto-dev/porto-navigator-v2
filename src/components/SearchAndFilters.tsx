import { useState } from 'react';
import { useTripStore } from '@/store/tripStore';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { PlaceCategory, CATEGORY_CONFIG } from '@/data/places';

export function SearchAndFilters() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    toggleCategory,
    priceFilter,
    setPriceFilter,
  } = useTripStore();
  const [showFilters, setShowFilters] = useState(false);

  const categories: PlaceCategory[] = ['ver', 'hacer', 'comer'];

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar lugares..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm font-medium"
      >
        <span>Filtros</span>
        {showFilters ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="shadow-sm">
          <CardContent className="p-4 space-y-4">
            {/* Category Filter */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                Categoría
              </p>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => {
                  const config = CATEGORY_CONFIG[cat];
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? config.color
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                Rango de Precio
              </p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'all' as const, label: 'Todos' },
                  { value: 'free' as const, label: 'Gratis' },
                  { value: 'budget' as const, label: 'Económico' },
                  { value: 'expensive' as const, label: 'Premium' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPriceFilter(option.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      priceFilter === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery || priceFilter !== 'all' || selectedCategories.length < 3) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setPriceFilter('all');
                }}
                className="w-full text-xs"
              >
                Limpiar filtros
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
