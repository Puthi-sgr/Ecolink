import { CBETAbout } from '../../types';
import { veunSaiSiemPangAbout } from './veunSaiSiemPang';

export const CBET_ABOUT: Record<string, CBETAbout> = {
  'CBET-016': veunSaiSiemPangAbout
};

export const useCBETAbout = () => CBET_ABOUT;
