import React from 'react';
import { AuthProvider } from './app/AuthContext';
import { TripProvider } from './app/TripContext';
import { AppRouter } from './app/AppRouter';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TripProvider>
        <AppRouter />
      </TripProvider>
    </AuthProvider>
  );
};

export default App;