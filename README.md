# 🏎️ GTA Vehicle Customizer

A modern Next.js application that allows users to create, customize, and export vehicles for GTA-style games. Features a 3D vehicle builder with real-time previews, performance calculations, and a comprehensive customization system.

![GTA Vehicle Customizer](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=GTA+Vehicle+Customizer)

## 🚀 Features

### Core Functionality

- **3D Vehicle Builder**: Real-time 3D preview with Three.js and React Three Fiber
- **Vehicle Customization**: Paint colors, finishes, performance mods, and visual enhancements
- **Performance System**: Dynamic stats calculation based on modifications
- **Save/Load System**: Save custom vehicles and load them later
- **Export Functionality**: Export vehicle designs as JSON files
- **Vehicle Gallery**: Browse different base models organized by category

### Technical Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Three.js** for 3D rendering
- **ShadCN UI** components
- **Real-time 3D rendering** with shadows and lighting
- **Responsive design** for desktop and mobile

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd fire-shield
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 Usage

### Vehicle Customization

1. **Choose a Base Model**: Start by selecting a vehicle from the gallery
2. **Customize Paint**: Choose primary/secondary colors and finish type
3. **Upgrade Performance**: Add engine upgrades, turbo, and transmission
4. **Modify Visuals**: Change wheels, window tint, and body kits
5. **Save Your Creation**: Save your custom vehicle to the collection
6. **Export Design**: Download your vehicle as a JSON file

### Vehicle Categories

- 🏎️ **Super Cars**: High-performance luxury vehicles (Adder, Zentorno, Infernus)
- 🚗 **Sports Cars**: Balanced performance vehicles (Banshee, Comet)
- 🚙 **Muscle Cars**: High acceleration, classic American style (Buffalo)
- 🚘 **Sedans**: Everyday practical vehicles (Sultan)
- 🚐 **SUVs**: Off-road capable vehicles (Patriot)

### Performance Stats

Each vehicle has 5 performance metrics:

- **Speed**: Maximum velocity
- **Acceleration**: 0-60 time
- **Braking**: Stopping power
- **Handling**: Cornering ability
- **Weight**: Vehicle mass (affects performance)

## 🔧 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── page.tsx           # Main application page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Vehicle3D.tsx      # 3D vehicle renderer
│   ├── CustomizationPanel.tsx # Vehicle customization UI
│   ├── VehicleGallery.tsx # Vehicle selection gallery
│   └── ui/               # UI components
├── types/                 # TypeScript type definitions
│   └── vehicle.ts        # Vehicle-related types
├── utils/                 # Utility functions
│   └── vehicle.ts        # Vehicle calculations
└── lib/                   # Library utilities
    └── utils.ts          # Common utilities
```

## 🎨 Customization Options

### Paint System

- **12 Primary Colors**: From classic red to chrome
- **12 Secondary Colors**: Accent color options
- **3 Finish Types**:
  - Matte: Non-reflective finish
  - Metallic: Standard metallic paint
  - Pearlescent: Premium iridescent finish

### Performance Modifications

- **Engine Levels**: 4 upgrade levels (15% performance boost per level)
- **Turbo**: +20% acceleration, +10% speed
- **Transmission Types**:
  - Street: Standard transmission
  - Sport: +10% acceleration, +5% handling
  - Race: +20% acceleration, +15% handling, +10% braking

### Visual Modifications

- **Wheel Options**: Sport, Muscle, Lowrider, Tuner, High End
- **Window Tint**: None, Light (30%), Dark (70%), Limo (90%)
- **Body Kits**: Stock, Street, Sport, Carbon Fiber

## 🔮 Future Enhancements

- [ ] MongoDB integration for persistent storage
- [ ] User authentication with NextAuth
- [ ] Real 3D car models (GLB/GLTF files)
- [ ] More vehicle categories and models
- [ ] Advanced lighting and material systems
- [ ] Vehicle comparison tool
- [ ] Social sharing features
- [ ] Mobile app version
- [ ] VR/AR preview modes

## 🛠️ Development

### Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Vehicles

1. Add vehicle data to `src/types/vehicle.ts` in the `VEHICLE_MODELS` array
2. Update the 3D model logic in `src/components/Vehicle3D.tsx`
3. Add any new categories to the gallery filters

### Customizing 3D Rendering

The 3D vehicle renderer supports:

- Dynamic materials based on paint finish
- Real-time lighting and shadows
- Animated wheels and effects
- Environment mapping for reflections

## 📦 Dependencies

### Core

- Next.js 15.3.4
- React 19.0.0
- TypeScript 5.x

### 3D Rendering

- Three.js 0.177.0
- @react-three/fiber 9.1.2
- @react-three/drei 10.3.0

### UI/Styling

- Tailwind CSS 4.x
- Radix UI components
- Lucide React icons
- Framer Motion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Grand Theft Auto vehicle customization systems
- Built with modern React and Next.js best practices
- 3D rendering powered by Three.js ecosystem
