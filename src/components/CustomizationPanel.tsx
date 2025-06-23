'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BODY_KITS, PAINT_COLORS, VehicleDesign, WHEEL_OPTIONS } from '@/types/vehicle';
import { calculateTotalPrice, calculateVehicleStats } from '@/utils/vehicle';

interface CustomizationPanelProps {
  design: VehicleDesign;
  onUpdate: (design: VehicleDesign) => void;
}

export default function CustomizationPanel({ design, onUpdate }: CustomizationPanelProps) {
  const stats = calculateVehicleStats(design);
  const totalPrice = calculateTotalPrice(design);

  const updateDesign = (updates: Partial<VehicleDesign>) => {
    onUpdate({ ...design, ...updates });
  };

  const updateModifications = (modifications: Partial<VehicleDesign['modifications']>) => {
    updateDesign({
      modifications: {
        ...design.modifications,
        ...modifications
      }
    });
  };

  const updatePaint = (paint: Partial<VehicleDesign['modifications']['paint']>) => {
    updateModifications({
      paint: {
        ...design.modifications.paint,
        ...paint
      }
    });
  };

  const updatePerformance = (performance: Partial<VehicleDesign['modifications']['performance']>) => {
    updateModifications({
      performance: {
        ...design.modifications.performance,
        ...performance
      }
    });
  };

  const updateVisual = (visual: Partial<VehicleDesign['modifications']['visual']>) => {
    updateModifications({
      visual: {
        ...design.modifications.visual,
        ...visual
      }
    });
  };

  return (
    <div className="bg-gray-900 text-white p-6 h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Vehicle Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Vehicle Name</label>
          <input
            type="text"
            value={design.name}
            onChange={(e) => updateDesign({ name: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Customization Tabs */}
        <Tabs defaultValue="paint" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="paint">🎨 Paint</TabsTrigger>
            <TabsTrigger value="performance">⚡ Performance</TabsTrigger>
            <TabsTrigger value="visual">👁️ Visual</TabsTrigger>
          </TabsList>

          <TabsContent value="paint" className="space-y-4">
            {/* Primary Color */}
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <div className="grid grid-cols-6 gap-2">
                {PAINT_COLORS.primary.map((color) => (
                  <button
                    key={color}
                    onClick={() => updatePaint({ primary: color })}
                    className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${design.modifications.paint.primary === color
                        ? 'border-white ring-2 ring-blue-500'
                        : 'border-gray-600'
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Color</label>
              <div className="grid grid-cols-6 gap-2">
                {PAINT_COLORS.secondary.map((color) => (
                  <button
                    key={color}
                    onClick={() => updatePaint({ secondary: color })}
                    className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${design.modifications.paint.secondary === color
                        ? 'border-white ring-2 ring-blue-500'
                        : 'border-gray-600'
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Paint Finish */}
            <div>
              <label className="block text-sm font-medium mb-2">Finish</label>
              <select
                value={design.modifications.paint.finish}
                onChange={(e) => updatePaint({ finish: e.target.value as 'matte' | 'metallic' | 'pearlescent' })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="matte">Matte</option>
                <option value="metallic">Metallic</option>
                <option value="pearlescent">Pearlescent</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            {/* Engine Level */}
            <div>
              <label className="block text-sm font-medium mb-2">Engine Level</label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    onClick={() => updatePerformance({ engineLevel: level as 1 | 2 | 3 | 4 })}
                    className={`px-3 py-2 rounded transition-all ${design.modifications.performance.engineLevel === level
                        ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    Lv. {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Cost: ${((design.modifications.performance.engineLevel - 1) * 50000).toLocaleString()}
              </p>
            </div>

            {/* Turbo */}
            <div className="bg-gray-800 p-3 rounded-lg">
              <label className="flex items-center justify-between">
                <span>Turbo Installed</span>
                <input
                  type="checkbox"
                  checked={design.modifications.performance.turboInstalled}
                  onChange={(e) => updatePerformance({ turboInstalled: e.target.checked })}
                  className="w-4 h-4"
                />
              </label>
              <p className="text-xs text-gray-400 mt-1">+20% acceleration, +10% speed (+$25,000)</p>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium mb-2">Transmission</label>
              <select
                value={design.modifications.performance.transmission}
                onChange={(e) => updatePerformance({ transmission: e.target.value as 'street' | 'sport' | 'race' })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="street">Street (Free)</option>
                <option value="sport">Sport (+$15,000)</option>
                <option value="race">Race (+$35,000)</option>
              </select>
            </div>
          </TabsContent>

          <TabsContent value="visual" className="space-y-4">
            {/* Wheels */}
            <div>
              <label className="block text-sm font-medium mb-2">Wheels</label>
              <select
                value={design.modifications.visual.wheels}
                onChange={(e) => updateVisual({ wheels: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="stock">Stock (Free)</option>
                {WHEEL_OPTIONS.map((wheel) => (
                  <option key={wheel.id} value={wheel.id}>
                    {wheel.name} (+${wheel.price.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Window Tint */}
            <div>
              <label className="block text-sm font-medium mb-2">Window Tint</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'none', label: 'None', opacity: '0%' },
                  { value: 'light', label: 'Light', opacity: '30%' },
                  { value: 'dark', label: 'Dark', opacity: '70%' },
                  { value: 'limo', label: 'Limo', opacity: '90%' }
                ].map((tint) => (
                  <button
                    key={tint.value}
                    onClick={() => updateVisual({ windowTint: tint.value as 'none' | 'light' | 'dark' | 'limo' })}
                    className={`px-3 py-2 rounded transition-all ${design.modifications.visual.windowTint === tint.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    <div>{tint.label}</div>
                    <div className="text-xs opacity-70">{tint.opacity}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Body Kit */}
            <div>
              <label className="block text-sm font-medium mb-2">Body Kit</label>
              <select
                value={design.modifications.visual.bodyKit}
                onChange={(e) => updateVisual({ bodyKit: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BODY_KITS.map((kit) => (
                  <option key={kit.id} value={kit.id}>
                    {kit.name} {kit.price > 0 && `(+$${kit.price.toLocaleString()})`}
                  </option>
                ))}
              </select>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Display */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Performance Stats</h3>
          <div className="space-y-3">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="capitalize font-medium">{key}:</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${value >= 90 ? 'bg-green-500' :
                          value >= 70 ? 'bg-yellow-500' :
                            value >= 50 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                      style={{ width: `${Math.min(value, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono w-8 text-right">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center text-xl font-semibold">
            <span>Total Price:</span>
            <span className="text-green-400">${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
