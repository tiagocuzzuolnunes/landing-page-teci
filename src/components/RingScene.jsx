"use client"
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';


function SetCamera() {
    const { camera, gl } = useThree();

    useEffect(() => {

        camera.position.set(1, 0, 0);
        camera.lookAt(0, 0, 0);
        gl.domElement.style.touchAction = 'none';
    }, [camera, gl]);

    return null;
}

function RingModel() {
    const { scene } = useGLTF('/anelFinal4.glb');
    const groupRef = useRef();

    return (
        <group ref={groupRef}>
            <primitive object={scene} position={[0, 0, 0]} scale={1} />
        </group>
    );
}

export default function RingScene() {
    return (
        <Canvas className='pt-16'>
            <ambientLight intensity={10} />
            <ambientLight intensity={10} />
            <ambientLight intensity={10} />
            <directionalLight position={[5, 5, 5]} intensity={10} />
            <directionalLight position={[10, 10, 10]} intensity={10} />
            <RingModel />
            <SetCamera />
            <OrbitControls
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                target={[0, 0, 0]}
            />
            <Environment preset="sunset" />
        </Canvas>
    );
}
