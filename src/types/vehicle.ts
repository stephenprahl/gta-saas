export interface VehicleDesign {
  id?: string;
  name: string;
  baseModel: string; // e.g., "adder", "zentorno"
  modifications: {
    paint: {
      primary: string;
      secondary?: string;
      finish: 'matte' | 'metallic' | 'pearlescent';
    };
    performance: {
      engineLevel: 1 | 2 | 3 | 4;
      turboInstalled: boolean;
      transmission: 'street' | 'sport' | 'race';
    };
    visual: {
      wheels: string;
      windowTint: 'none' | 'light' | 'dark' | 'limo';
      bodyKit: string;
    };
  };
  stats?: VehicleStats;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VehicleStats {
  speed: number;
  acceleration: number;
  braking: number;
  handling: number;
  weight: number;
}

export interface VehicleModel {
  id: string;
  name: string;
  category: 'super' | 'sports' | 'coupe' | 'sedan' | 'suv' | 'muscle';
  baseStats: VehicleStats;
  price: number;
  meshPath: string;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'paint' | 'wheels' | 'bodykit' | 'spoiler';
  category?: string;
  price: number;
  statsModifier?: Partial<VehicleStats>;
  color?: string;
  meshPath?: string;
}

export const VEHICLE_MODELS: VehicleModel[] = [
  {
    id: 'adder',
    name: 'Adder',
    category: 'super',
    baseStats: { speed: 95, acceleration: 85, braking: 70, handling: 85, weight: 1200 },
    price: 1000000,
    meshPath: '/models/adder.glb'
  },
  {
    id: 'zentorno',
    name: 'Zentorno',
    category: 'super',
    baseStats: { speed: 92, acceleration: 90, braking: 75, handling: 88, weight: 1150 },
    price: 725000,
    meshPath: '/models/zentorno.glb'
  },
  {
    id: 'infernus',
    name: 'Infernus',
    category: 'super',
    baseStats: { speed: 88, acceleration: 85, braking: 70, handling: 82, weight: 1300 },
    price: 440000,
    meshPath: '/models/infernus.glb'
  },
  {
    id: 'banshee',
    name: 'Banshee',
    category: 'sports',
    baseStats: { speed: 82, acceleration: 78, braking: 65, handling: 75, weight: 1100 },
    price: 126000,
    meshPath: '/models/banshee.glb'
  },
  {
    id: 'comet',
    name: 'Comet',
    category: 'sports',
    baseStats: { speed: 85, acceleration: 82, braking: 68, handling: 80, weight: 1250 },
    price: 100000,
    meshPath: '/models/comet.glb'
  },
  {
    id: 'buffalo',
    name: 'Buffalo',
    category: 'muscle',
    baseStats: { speed: 78, acceleration: 75, braking: 60, handling: 65, weight: 1500 },
    price: 35000,
    meshPath: '/models/buffalo.glb'
  },
  {
    id: 'sultan',
    name: 'Sultan',
    category: 'sedan',
    baseStats: { speed: 72, acceleration: 70, braking: 65, handling: 78, weight: 1350 },
    price: 12000,
    meshPath: '/models/sultan.glb'
  },
  {
    id: 'patriot',
    name: 'Patriot',
    category: 'suv',
    baseStats: { speed: 65, acceleration: 60, braking: 55, handling: 55, weight: 2200 },
    price: 50000,
    meshPath: '/models/patriot.glb'
  }
];

export const PAINT_COLORS = {
  primary: [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#FFC0CB', '#000000', '#FFFFFF', '#808080'
  ],
  secondary: [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#FFC0CB', '#000000', '#FFFFFF', '#808080'
  ]
};

export const WHEEL_OPTIONS = [
  { id: 'sport', name: 'Sport', price: 5000 },
  { id: 'muscle', name: 'Muscle', price: 7500 },
  { id: 'lowrider', name: 'Lowrider', price: 10000 },
  { id: 'tuner', name: 'Tuner', price: 12500 },
  { id: 'high_end', name: 'High End', price: 15000 }
];

export const BODY_KITS = [
  { id: 'stock', name: 'Stock', price: 0 },
  { id: 'street', name: 'Street', price: 25000 },
  { id: 'sport', name: 'Sport', price: 50000 },
  { id: 'carbon', name: 'Carbon Fiber', price: 100000 }
];
