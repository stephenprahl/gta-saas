# GTA Vehicle Customizer App Specification

## Project Overview

Build a Next.js/TypeScript application that allows users to create, customize, and export vehicles for GTA-style games. The app should feature a 3D vehicle builder with real-time previews and performance calculations.

## Technical Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + ShadCN UI components
- **3D Rendering**: Three.js + React Three Fiber
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas (for user creations)
- **Authentication**: Next-Auth

## Core Features

### 1. Vehicle Builder System

```typescript
interface VehicleDesign {
  baseModel: string; // e.g., "adder", "zentorno"
  modifications: {
    paint: {
      primary: string;
      secondary?: string;
      finish: 'matte'|'metallic'|'pearlescent';
    };
    performance: {
      engineLevel: 1|2|3|4;
      turboInstalled: boolean;
      transmission: 'street'|'sport'|'race';
    };
    visual: {
      wheels: string;
      windowTint: 'none'|'light'|'dark'|'limo';
      bodyKit: string;
    };
  };
}
