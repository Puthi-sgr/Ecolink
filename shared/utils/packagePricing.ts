import { CapacityBand } from '../types';

export const getCapacityBandKey = (band: CapacityBand) => `${band.min}-${band.max}`;

export interface TieredPricingBreakdownRow {
  band: CapacityBand;
  bandKey: string;
  thresholdStart: number;
  thresholdEnd: number;
  seatsFilled: number;
  subtotal: number;
  isCurrentTier: boolean;
}

export const findCapacityBandForGroupSize = (
  bands: CapacityBand[],
  groupSize: number | string | null | undefined
) => {
  const normalizedSize =
    typeof groupSize === 'string' ? Number(groupSize) : groupSize;

  if (!normalizedSize || Number.isNaN(normalizedSize)) {
    return undefined;
  }

  return bands.find((band) => normalizedSize >= band.min && normalizedSize <= band.max);
};

export const getEstimatedPackageTotal = (
  bands: CapacityBand[],
  groupSize: number | string | null | undefined
) => {
  return getTieredPricingBreakdown(bands, groupSize).reduce(
    (total, row) => total + row.subtotal,
    0
  );
};

export const getTieredPricingBreakdown = (
  bands: CapacityBand[],
  groupSize: number | string | null | undefined
): TieredPricingBreakdownRow[] => {
  const normalizedSize =
    typeof groupSize === 'string' ? Number(groupSize) : groupSize;

  if (!bands.length || !normalizedSize || Number.isNaN(normalizedSize)) {
    return [];
  }

  const sortedBands = [...bands].sort((a, b) => a.max - b.max);

  return sortedBands.map((band, index) => {
    const previousBandMax = index === 0 ? 0 : sortedBands[index - 1].max;
    const thresholdStart = previousBandMax + 1;
    const thresholdEnd = band.max;
    const seatsFilled = Math.max(
      0,
      Math.min(normalizedSize, thresholdEnd) - previousBandMax
    );

    return {
      band,
      bandKey: getCapacityBandKey(band),
      thresholdStart,
      thresholdEnd,
      seatsFilled,
      subtotal: seatsFilled * band.pricePerStudent,
      isCurrentTier:
        normalizedSize > previousBandMax && normalizedSize <= thresholdEnd,
    };
  });
};

export const getCapacityBandDisplayRange = (bands: CapacityBand[]) => {
  if (!bands.length) {
    return { from: 0, to: 0 };
  }

  return {
    from: bands[0]?.pricePerStudent ?? 0,
    to: bands[bands.length - 1]?.pricePerStudent ?? 0,
  };
};

export const getRecommendedTransportForBand = (band: CapacityBand) => {
  if (band.max <= 20) {
    return 'Coordinated Minibus';
  }

  return 'Standard 45-Seat Coach';
};
