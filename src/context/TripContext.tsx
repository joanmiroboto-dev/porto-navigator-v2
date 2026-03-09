import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TripState {
  visitedPlaces: Set<string>;
  toggleVisited: (placeId: string) => void;
  isVisited: (placeId: string) => boolean;
}

const TripContext = createContext<TripState | undefined>(undefined);

const STORAGE_KEY = 'oporto-visited';

export function TripProvider({ children }: { children: ReactNode }) {
  const [visitedPlaces, setVisitedPlaces] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visitedPlaces]));
  }, [visitedPlaces]);

  const toggleVisited = (placeId: string) => {
    setVisitedPlaces(prev => {
      const next = new Set(prev);
      if (next.has(placeId)) next.delete(placeId);
      else next.add(placeId);
      return next;
    });
  };

  const isVisited = (placeId: string) => visitedPlaces.has(placeId);

  return (
    <TripContext.Provider value={{ visitedPlaces, toggleVisited, isVisited }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used within TripProvider');
  return ctx;
}
