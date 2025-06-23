'use client';

import { VehicleDesign } from '@/types/vehicle';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

interface Vehicle3DProps {
  design: VehicleDesign;
  enableControls?: boolean;
  autoRotate?: boolean;
}

function VehicleMesh({ design }: { design: VehicleDesign }) {
  const meshRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);

  // Auto rotation and wheel animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    // Rotate wheels
    if (wheelsRef.current) {
      wheelsRef.current.children.forEach((wheel) => {
        wheel.rotation.x += 0.02;
      });
    }
  });

  const primaryColor = design.modifications.paint.primary;
  const secondaryColor = design.modifications.paint.secondary || primaryColor;

  // Create material based on paint finish
  const createMaterial = (color: string) => {
    const baseColor = new THREE.Color(color);

    switch (design.modifications.paint.finish) {
      case 'matte':
        return new THREE.MeshLambertMaterial({
          color: baseColor,
          transparent: true,
          opacity: 0.9
        });
      case 'metallic':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          metalness: 0.8,
          roughness: 0.2,
          envMapIntensity: 1.0
        });
      case 'pearlescent':
        return new THREE.MeshPhysicalMaterial({
          color: baseColor,
          metalness: 0.9,
          roughness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          iridescence: 0.3,
          iridescenceIOR: 1.3
        });
      default:
        return new THREE.MeshStandardMaterial({ color: baseColor });
    }
  };

  // Different car shapes based on model
  const getCarDimensions = () => {
    switch (design.baseModel) {
      case 'adder':
        return { width: 4.2, height: 1.2, length: 9, isSuper: true };
      case 'zentorno':
        return { width: 4.0, height: 1.1, length: 8.5, isSuper: true };
      case 'infernus':
        return { width: 3.8, height: 1.3, length: 8, isSuper: true };
      default:
        return { width: 4, height: 1, length: 8, isSuper: false };
    }
  };

  const dimensions = getCarDimensions();

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* Main body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.length]} />
        <primitive object={createMaterial(primaryColor)} />
      </mesh>

      {/* Hood */}
      <mesh position={[0, 0.7, dimensions.length * 0.25]} castShadow>
        <boxGeometry args={[dimensions.width * 0.9, 0.3, dimensions.length * 0.35]} />
        <primitive object={createMaterial(secondaryColor)} />
      </mesh>

      {/* Roof (varies by car type) */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[
          dimensions.width * 0.8,
          dimensions.isSuper ? 0.6 : 0.8,
          dimensions.length * 0.6
        ]} />
        <primitive object={createMaterial(primaryColor)} />
      </mesh>

      {/* Spoiler for performance cars */}
      {design.modifications.visual.bodyKit !== 'stock' && (
        <mesh position={[0, 1.5, -dimensions.length * 0.4]} castShadow>
          <boxGeometry args={[dimensions.width * 0.7, 0.2, 0.8]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      )}

      {/* Wheels */}
      <group ref={wheelsRef}>
        {[
          [-dimensions.width * 0.35, -0.3, dimensions.length * 0.3], // Front left
          [dimensions.width * 0.35, -0.3, dimensions.length * 0.3],  // Front right
          [-dimensions.width * 0.35, -0.3, -dimensions.length * 0.3], // Rear left
          [dimensions.width * 0.35, -0.3, -dimensions.length * 0.3]   // Rear right
        ].map((position, index) => (
          <group key={index} position={position as [number, number, number]}>
            {/* Tire */}
            <mesh castShadow>
              <cylinderGeometry args={[0.6, 0.6, 0.3, 16]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            {/* Rim */}
            <mesh position={[0, 0, 0.16]}>
              <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
              <meshStandardMaterial
                color={design.modifications.visual.wheels === 'stock' ? '#666666' : '#c0c0c0'}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Windows with tint */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[dimensions.width * 0.7, 0.7, dimensions.length * 0.5]} />
        <meshPhysicalMaterial
          color="#87CEEB"
          transparent
          opacity={design.modifications.visual.windowTint === 'none' ? 0.2 :
            design.modifications.visual.windowTint === 'light' ? 0.4 :
              design.modifications.visual.windowTint === 'dark' ? 0.6 : 0.8}
          roughness={0.1}
          transmission={1}
          thickness={0.1}
        />
      </mesh>

      {/* Headlights */}
      <group>
        {[-dimensions.width * 0.3, dimensions.width * 0.3].map((x, index) => (
          <mesh key={index} position={[x, 0.3, dimensions.length * 0.5]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.9}
              roughness={0}
              metalness={0}
              emissive="#ffffff"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Taillights */}
      <group>
        {[-dimensions.width * 0.3, dimensions.width * 0.3].map((x, index) => (
          <mesh key={index} position={[x, 0.3, -dimensions.length * 0.5]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshPhysicalMaterial
              color="#ff0000"
              transparent
              opacity={0.8}
              roughness={0}
              metalness={0}
              emissive="#ff0000"
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[4, 1, 8]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export default function Vehicle3D({ design, enableControls = true, autoRotate = false }: Vehicle3DProps) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 4, 8]} />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 5, -10]} intensity={0.8} color="#4a90ff" />
        <spotLight
          position={[0, 20, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Environment */}
        <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>

        {/* Vehicle */}
        <Suspense fallback={<LoadingFallback />}>
          <VehicleMesh design={design} />
        </Suspense>

        {/* Showroom floor */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Reflective floor circle under car */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.49, 0]}>
          <circleGeometry args={[8, 64]} />
          <meshStandardMaterial
            color="#0f0f23"
            metalness={1.0}
            roughness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Atmospheric fog */}
        <fog attach="fog" args={['#0a0a0a', 20, 100]} />

        {/* Controls */}
        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minDistance={5}
            maxDistance={25}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.2}
            target={[0, 0, 0]}
          />
        )}
      </Canvas>
    </div>
  );
}
