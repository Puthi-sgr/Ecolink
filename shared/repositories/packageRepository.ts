import { CBET_ABOUT } from '../data/cbetAboutData';
import { ALL_MOCK_TRIPS, ENRICHED_CBET_PACKAGES } from '../data/cbetData';

export const getPackages = () => ENRICHED_CBET_PACKAGES;
export const usePackages = () => getPackages();
export const getPackageById = (id: string) => getPackages().find((pkg) => pkg.id === id);
export const getPackageAboutById = (id: string) => CBET_ABOUT[id] ?? Object.values(CBET_ABOUT)[0];
export const getInitialTrips = () => ALL_MOCK_TRIPS;

