import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Trip, ProjectStatus } from '../shared/types';
import { MOCK_TRIPS } from '../shared/data/cbetData';

interface TripContextType {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  getTrip: (id: string) => Trip | undefined;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);

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