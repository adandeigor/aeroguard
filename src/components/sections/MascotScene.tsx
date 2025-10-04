"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Mascot } from "./Mascot";
import * as THREE from "three";

function FloatingMascot() {
    const ref = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // mouvement vertical sinusoïdal (effet de flottement)
        ref.current.position.y = Math.sin(t * 1.5) * 0.2 - 1;
        // légère rotation lente sur l’axe Y
        ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    });

    return <Mascot ref={ref} scale={1.5} position={[0, -1, 0]} />;
}

export default function MascotScene() {
    return (
        <div className="w-full h-screen bg-sky-900">
            <Canvas shadows camera={{ position: [3, 2, 5], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} castShadow />
                <Suspense fallback={null}>
                    <FloatingMascot />
                    <Environment preset="sunset" />
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
