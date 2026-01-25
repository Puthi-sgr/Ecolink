import React from 'react';
import { AuthProvider } from './app/AuthContext';
import { TripProvider } from './app/TripContext';
import { FavoritesProvider } from './app/FavoritesContext';
import { AppRouter } from './app/AppRouter';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TripProvider>
        <FavoritesProvider>
          <AppRouter />
        </FavoritesProvider>
      </TripProvider>
    </AuthProvider>
  );
};

export default App;
