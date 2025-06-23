'use client';

import CustomizationPanel from '@/components/CustomizationPanel';
import Vehicle3D from '@/components/Vehicle3D';
import VehicleGallery from '@/components/VehicleGallery';
import { VehicleDesign } from '@/types/vehicle';
import { createDefaultVehicle } from '@/utils/vehicle';
import { useState } from 'react';

export default function Home() {
  const [currentVehicle, setCurrentVehicle] = useState<VehicleDesign>(createDefaultVehicle());
  const [activeTab, setActiveTab] = useState<'customize' | 'gallery' | 'saved'>('customize');
  const [savedVehicles, setSavedVehicles] = useState<VehicleDesign[]>([]);

  // Load saved vehicles on component mount
  const loadSavedVehicles = async () => {
    try {
      const response = await fetch('/api/vehicles');
      if (response.ok) {
        const vehicles = await response.json();
        setSavedVehicles(vehicles);
      }
    } catch (error) {
      console.error('Failed to load saved vehicles:', error);
    }
  };

  // Save current vehicle
  const saveVehicle = async () => {
    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentVehicle)
      });

      if (response.ok) {
        const savedVehicle = await response.json();
        setSavedVehicles(prev => [...prev, savedVehicle]);
        alert('Vehicle saved successfully!');
      } else {
        alert('Failed to save vehicle');
      }
    } catch (error) {
      console.error('Failed to save vehicle:', error);
      alert('Failed to save vehicle');
    }
  };

  // Load a saved vehicle
  const loadVehicle = (vehicle: VehicleDesign) => {
    setCurrentVehicle(vehicle);
    setActiveTab('customize');
  };

  const handleModelSelect = (modelId: string) => {
    setCurrentVehicle(createDefaultVehicle(modelId));
    setActiveTab('customize');
  };

  const exportVehicle = () => {
    const dataStr = JSON.stringify(currentVehicle, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentVehicle.name.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">
              🏎️ GTA Vehicle Customizer
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setActiveTab('gallery');
                  loadSavedVehicles();
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'gallery'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                🏪 Models
              </button>
              <button
                onClick={() => {
                  setActiveTab('saved');
                  loadSavedVehicles();
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'saved'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                💾 Saved
              </button>
              <button
                onClick={() => setActiveTab('customize')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'customize'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                🔧 Customize
              </button>
              <button
                onClick={saveVehicle}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                💾 Save
              </button>
              <button
                onClick={exportVehicle}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                📤 Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'gallery' ? (
          <VehicleGallery
            selectedModel={currentVehicle.baseModel}
            onModelSelect={handleModelSelect}
          />
        ) : activeTab === 'saved' ? (
          <div className="p-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Saved Vehicles</h2>
              {savedVehicles.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <div className="text-6xl mb-4">🚗</div>
                  <p className="text-lg">No saved vehicles yet</p>
                  <p className="text-sm">Create and save your first custom vehicle!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedVehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => loadVehicle(vehicle)}
                    >
                      <div className="aspect-video bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                        <div className="text-gray-400 text-center">
                          <div className="text-2xl mb-2">🚗</div>
                          <div className="text-sm">Click to Load</div>
                        </div>
                      </div>
                      <h3 className="text-white font-semibold text-lg">{vehicle.name}</h3>
                      <p className="text-gray-400 capitalize">{vehicle.baseModel}</p>
                      <div className="mt-2 text-sm text-gray-300">
                        <div>Paint: {vehicle.modifications.paint.finish}</div>
                        <div>Engine: Level {vehicle.modifications.performance.engineLevel}</div>
                        {vehicle.modifications.performance.turboInstalled && (
                          <div className="text-blue-400">⚡ Turbo</div>
                        )}
                      </div>
                      {vehicle.createdAt && (
                        <p className="text-xs text-gray-500 mt-2">
                          Created: {new Date(vehicle.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* 3D Viewer */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">
                    {currentVehicle.name}
                  </h2>
                  <p className="text-gray-400 capitalize">
                    {currentVehicle.baseModel}
                  </p>
                </div>
                <div className="h-[600px]">
                  <Vehicle3D design={currentVehicle} autoRotate />
                </div>
              </div>
            </div>

            {/* Customization Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl h-[680px]">
                <CustomizationPanel
                  design={currentVehicle}
                  onUpdate={setCurrentVehicle}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p>
              GTA Vehicle Customizer - Create and customize your dream rides
            </p>
            <p className="text-sm mt-2">
              Use the 3D viewer to see your modifications in real-time
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
