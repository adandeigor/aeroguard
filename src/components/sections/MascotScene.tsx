"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import { Mascot } from "./Mascot";
import * as THREE from "three";

interface MascotSceneProps {
    scale?: number;
    height?: string;
    floating?: boolean;
    orbit?: boolean;
}

/* --- CENTRAGE AUTOMATIQUE DU MODÈLE --- */
function AutoCenteredModel({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null);
    const { camera } = useThree();

    useEffect(() => {
        if (group.current) {
            const box = new THREE.Box3().setFromObject(group.current);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());

            // Recentrer le modèle
            group.current.position.x -= center.x;
            group.current.position.y -= center.y;
            group.current.position.z -= center.z;

            // Ajuster la caméra pour que tout rentre bien
            camera.position.z = size * 1.2;
        }
    }, [camera]);

    return <group ref={group}>{children}</group>;
}

/* --- MASCOTTE FLOTTANTE --- */
function FloatingMascot({ scale = 1.5 }: { scale?: number }) {
    const ref = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.position.y = Math.sin(t * 1.5) * 0.2; // flottement
        ref.current.rotation.y = Math.sin(t * 0.5) * 0.2; // rotation douce
    });

    return <Mascot ref={ref} scale={scale} />;
}

/* --- SCÈNE PRINCIPALE --- */
export default function MascotScene({
    scale = 1.5,
    height = "400px",
    floating = true,
    orbit = false,
}: MascotSceneProps) {
    return (
        <div className="relative overflow-hidden w-full" style={{ height }}>
            <Canvas shadows camera={{ position: [3, 2, 5], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} castShadow />
                <Suspense fallback={null}>
                    <AutoCenteredModel>
                        {floating ? (
                            <FloatingMascot scale={scale} />
                        ) : (
                            <Mascot scale={scale} />
                        )}
                    </AutoCenteredModel>
                    <Environment preset="sunset" />
                </Suspense>
                {orbit && <OrbitControls enableZoom={false} />}
            </Canvas>
        </div>
    );
}
