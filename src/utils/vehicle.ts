import { VEHICLE_MODELS, VehicleDesign, VehicleStats } from '@/types/vehicle';

export function calculateVehicleStats(design: VehicleDesign): VehicleStats {
  const baseModel = VEHICLE_MODELS.find(model => model.id === design.baseModel);
  if (!baseModel) {
    throw new Error(`Vehicle model ${design.baseModel} not found`);
  }

  const stats = { ...baseModel.baseStats };

  // Performance modifications
  const { performance } = design.modifications;

  // Engine level increases speed and acceleration
  const engineMultiplier = 1 + (performance.engineLevel - 1) * 0.15;
  stats.speed *= engineMultiplier;
  stats.acceleration *= engineMultiplier;

  // Turbo adds extra acceleration
  if (performance.turboInstalled) {
    stats.acceleration *= 1.2;
    stats.speed *= 1.1;
  }

  // Transmission affects handling and acceleration
  switch (performance.transmission) {
    case 'sport':
      stats.acceleration *= 1.1;
      stats.handling *= 1.05;
      break;
    case 'race':
      stats.acceleration *= 1.2;
      stats.handling *= 1.15;
      stats.braking *= 1.1;
      break;
  }

  // Weight affects acceleration and handling (inversely)
  const weightFactor = 1000 / stats.weight;
  stats.acceleration *= weightFactor;
  stats.handling *= weightFactor;

  // Round all stats to integers
  Object.keys(stats).forEach(key => {
    stats[key as keyof VehicleStats] = Math.round(stats[key as keyof VehicleStats]);
  });

  return stats;
}

export function calculateTotalPrice(design: VehicleDesign): number {
  const baseModel = VEHICLE_MODELS.find(model => model.id === design.baseModel);
  if (!baseModel) return 0;

  let totalPrice = baseModel.price;

  // Performance upgrades
  const { performance } = design.modifications;
  totalPrice += (performance.engineLevel - 1) * 50000; // Engine upgrades
  if (performance.turboInstalled) totalPrice += 25000; // Turbo

  switch (performance.transmission) {
    case 'sport':
      totalPrice += 15000;
      break;
    case 'race':
      totalPrice += 35000;
      break;
  }

  // Visual modifications (simplified pricing)
  if (design.modifications.visual.wheels !== 'stock') {
    totalPrice += 10000; // Wheel upgrade
  }

  if (design.modifications.visual.bodyKit !== 'stock') {
    totalPrice += 50000; // Body kit
  }

  return totalPrice;
}

export function getPerformanceRating(stats: VehicleStats): string {
  const average = (stats.speed + stats.acceleration + stats.braking + stats.handling) / 4;

  if (average >= 90) return 'S';
  if (average >= 80) return 'A';
  if (average >= 70) return 'B';
  if (average >= 60) return 'C';
  return 'D';
}

export function createDefaultVehicle(baseModel: string = 'adder'): VehicleDesign {
  return {
    name: 'Untitled Vehicle',
    baseModel,
    modifications: {
      paint: {
        primary: '#FF0000',
        secondary: '#000000',
        finish: 'metallic'
      },
      performance: {
        engineLevel: 1,
        turboInstalled: false,
        transmission: 'street'
      },
      visual: {
        wheels: 'stock',
        windowTint: 'none',
        bodyKit: 'stock'
      }
    }
  };
}
