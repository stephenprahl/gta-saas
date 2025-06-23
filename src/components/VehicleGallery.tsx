'use client';

import { VEHICLE_MODELS, VehicleModel } from '@/types/vehicle';
import { useState } from 'react';

interface VehicleGalleryProps {
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
}

export default function VehicleGallery({ selectedModel, onModelSelect }: VehicleGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(VEHICLE_MODELS.map(model => model.category)))];

  const filteredModels = selectedCategory === 'all'
    ? VEHICLE_MODELS
    : VEHICLE_MODELS.filter(model => model.category === selectedCategory);

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'super': return '🏎️';
      case 'sports': return '🚗';
      case 'muscle': return '🚙';
      case 'sedan': return '🚘';
      case 'suv': return '🚐';
      case 'coupe': return '🚗';
      default: return '🚗';
    }
  };

  return (
    <div className="bg-gray-800 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-4">🏪 Vehicle Showroom</h3>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all capitalize ${selectedCategory === category
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {category === 'all' ? '🚗 All' : `${getCategoryEmoji(category)} ${category}`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredModels.map((model) => (
          <VehicleCard
            key={model.id}
            model={model}
            isSelected={selectedModel === model.id}
            onSelect={() => onModelSelect(model.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface VehicleCardProps {
  model: VehicleModel;
  isSelected: boolean;
  onSelect: () => void;
}

function VehicleCard({ model, isSelected, onSelect }: VehicleCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'super': return 'text-red-400';
      case 'sports': return 'text-blue-400';
      case 'muscle': return 'text-orange-400';
      case 'sedan': return 'text-gray-400';
      case 'suv': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'super': return '🏎️';
      case 'sports': return '🚗';
      case 'muscle': return '🚙';
      case 'sedan': return '🚘';
      case 'suv': return '🚐';
      default: return '🚗';
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`
        bg-gray-700 rounded-lg p-4 cursor-pointer transition-all duration-300 transform
        ${isSelected
          ? 'ring-2 ring-blue-500 bg-gray-600 scale-105 shadow-lg shadow-blue-500/25'
          : 'hover:bg-gray-600 hover:scale-105 hover:shadow-lg'
        }
      `}
    >
      {/* Vehicle Preview */}
      <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
        <div className="text-gray-400 text-center z-10">
          <div className="text-4xl mb-2">{getCategoryEmoji(model.category)}</div>
          <div className="text-sm font-medium">{model.name}</div>
        </div>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
        </div>
      </div>

      <div className="text-white">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-lg">{model.name}</h4>
          {isSelected && <div className="text-blue-400 text-sm">✓ Selected</div>}
        </div>
        <p className={`text-sm capitalize mb-2 font-medium ${getCategoryColor(model.category)}`}>
          {getCategoryEmoji(model.category)} {model.category}
        </p>
        <p className="text-green-400 font-bold text-lg">${model.price.toLocaleString()}</p>
      </div>

      {/* Stats bars */}
      <div className="mt-4 space-y-2">
        {Object.entries(model.baseStats).map(([stat, value]) => (
          <div key={stat} className="flex items-center justify-between text-xs">
            <span className="text-gray-400 capitalize w-20 font-medium">{stat}:</span>
            <div className="flex-1 mx-2">
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${value >= 90 ? 'bg-green-500' :
                      value >= 70 ? 'bg-yellow-500' :
                        value >= 50 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                  style={{ width: `${Math.min(value, 100)}%` }}
                />
              </div>
            </div>
            <span className="text-gray-300 w-6 text-right font-mono">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
