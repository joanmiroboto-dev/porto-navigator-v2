import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TripState {
  visitedPlaces: Set<string>;
  toggleVisited: (placeId: string) => void;
  isVisited: (placeId: string) => boolean;
  notes: Record<string, string>;
  setNote: (placeId: string, note: string) => void;
  getNote: (placeId: string) => string;
}

const TripContext = createContext<TripState | undefined>(undefined);

const STORAGE_KEY = 'oporto-visited';
const NOTES_KEY = 'oporto-notes';

export function TripProvider({ children }: { children: ReactNode }) {
  const [visitedPlaces, setVisitedPlaces] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visitedPlaces]));
  }, [visitedPlaces]);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const toggleVisited = (placeId: string) => {
    setVisitedPlaces(prev => {
      const next = new Set(prev);
      if (next.has(placeId)) next.delete(placeId);
      else next.add(placeId);
      return next;
    });
  };

  const isVisited = (placeId: string) => visitedPlaces.has(placeId);

  const setNote = (placeId: string, note: string) => {
    setNotes(prev => {
      if (!note.trim()) {
        const { [placeId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [placeId]: note };
    });
  };

  const getNote = (placeId: string) => notes[placeId] || '';

  return (
    <TripContext.Provider value={{ visitedPlaces, toggleVisited, isVisited, notes, setNote, getNote }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used within TripProvider');
  return ctx;
}
