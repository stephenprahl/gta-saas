import { VehicleDesign } from '@/types/vehicle';
import { NextRequest, NextResponse } from 'next/server';

// In a real application, this would connect to MongoDB
// For now, we'll use in-memory storage as a demo
const vehicleDesigns: VehicleDesign[] = [
  // Add some sample vehicles
  {
    id: 'sample-1',
    name: 'Fire Dragon',
    baseModel: 'adder',
    modifications: {
      paint: { primary: '#FF0000', secondary: '#000000', finish: 'metallic' },
      performance: { engineLevel: 4, turboInstalled: true, transmission: 'race' },
      visual: { wheels: 'high_end', windowTint: 'dark', bodyKit: 'carbon' }
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'sample-2',
    name: 'Ice Storm',
    baseModel: 'zentorno',
    modifications: {
      paint: { primary: '#00FFFF', secondary: '#FFFFFF', finish: 'pearlescent' },
      performance: { engineLevel: 3, turboInstalled: true, transmission: 'sport' },
      visual: { wheels: 'tuner', windowTint: 'light', bodyKit: 'sport' }
    },
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
];

export async function GET() {
  return NextResponse.json(vehicleDesigns);
}

export async function POST(request: NextRequest) {
  try {
    const design: VehicleDesign = await request.json();

    // Add ID and timestamps
    const newDesign: VehicleDesign = {
      ...design,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    vehicleDesigns.push(newDesign);

    return NextResponse.json(newDesign, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid vehicle design data' },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const design: VehicleDesign = await request.json();

    if (!design.id) {
      return NextResponse.json(
        { error: 'Vehicle design ID is required' },
        { status: 400 }
      );
    }

    const index = vehicleDesigns.findIndex(d => d.id === design.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Vehicle design not found' },
        { status: 404 }
      );
    }

    vehicleDesigns[index] = {
      ...design,
      updatedAt: new Date()
    };

    return NextResponse.json(vehicleDesigns[index]);
  } catch {
    return NextResponse.json(
      { error: 'Invalid vehicle design data' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Vehicle design ID is required' },
        { status: 400 }
      );
    }

    const index = vehicleDesigns.findIndex(d => d.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Vehicle design not found' },
        { status: 404 }
      );
    }

    vehicleDesigns.splice(index, 1);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete vehicle design' },
      { status: 500 }
    );
  }
}
