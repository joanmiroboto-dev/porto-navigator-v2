import { create } from 'zustand';
import { PlaceCategory } from '@/data/places';

interface TripStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: PlaceCategory[];
  toggleCategory: (category: PlaceCategory) => void;
  priceFilter: 'all' | 'free' | 'budget' | 'expensive';
  setPriceFilter: (filter: 'all' | 'free' | 'budget' | 'expensive') => void;
  showStats: boolean;
  setShowStats: (show: boolean) => void;
}

export const useTripStore = create<TripStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategories: ['ver', 'hacer', 'comer'],
  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),
  priceFilter: 'all',
  setPriceFilter: (filter) => set({ priceFilter: filter }),
  showStats: false,
  setShowStats: (show) => set({ showStats: show }),
}));
