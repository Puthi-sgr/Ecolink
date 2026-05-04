import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Trip } from '../shared/types';
import { getInitialTrips } from '../shared/repositories/packageRepository';

interface TripContextType {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  getTrip: (id: string) => Trip | undefined;
}

const TripContext = createContext<TripContextType | undefined>(undefined);
const TRIPS_STORAGE_KEY = 'ecolink:trips';

const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(() => readStorage(TRIPS_STORAGE_KEY, getInitialTrips()));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
  }, [trips]);

  const addTrip = (trip: Trip) => {
    setTrips(prev => [trip, ...prev]);
  };

  const updateTrip = (id: string, updates: Partial<Trip>) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const getTrip = (id: string) => {
    return trips.find(t => t.id === id);
  };

  return (
    <TripContext.Provider value={{ trips, addTrip, updateTrip, getTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrips must be used within TripProvider');
  return context;
};
