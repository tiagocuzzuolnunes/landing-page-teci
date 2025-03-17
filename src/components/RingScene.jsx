"use client"
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';


function SetCamera() {
    const { camera, gl } = useThree();

    useEffect(() => {
        // Definindo a posição da câmera de forma fixa
        camera.position.set(1, 0, 0); // Ajuste conforme necessário para o seu modelo
        camera.lookAt(0, 0, 0); // Garante que a câmera esteja olhando para o centro
        gl.domElement.style.touchAction = 'none'; // Desabilita o movimento da câmera ao clicar
    }, [camera, gl]);

    return null;
}

function RingModel() {
    const { scene } = useGLTF(process.env.REACT_APP_GLTF_MODEL_PATH);

    const groupRef = useRef();

    // Garantir que a rotação aconteça em torno do centro do objeto sem translação
    // useFrame(() => {
    //     if (groupRef.current) {
    //         // Aplicar rotação apenas no eixo Y sem afetar a posição
    //         groupRef.current.rotation.y += 0.05;
    //     }
    // });

    return (
        <group ref={groupRef}>
            {/* O modelo GLTF é carregado dentro do group */}
            <primitive object={scene} position={[0, 0, 0]} scale={1} />
        </group>
    );
}

export default function RingScene() {
    return (
        <Canvas className='pt-16'>
            {/* Luz ambiente e luz direcional */}
            <ambientLight intensity={10} />
            <ambientLight intensity={10} />
            <ambientLight intensity={10} />
            <directionalLight position={[5, 5, 5]} intensity={10} />
            <directionalLight position={[10, 10, 10]} intensity={10} />

            {/* Carregar o modelo GLB */}
            <RingModel />

            <SetCamera />

            {/* OrbitControls para rotação horizontal apenas */}
            <OrbitControls
                enableZoom={true}
                enablePan={false}
                enableRotate={true} // Desabilitar rotação da câmera
                target={[0, 0, 0]}  // Gira em torno do centro do objeto
            />
            <Environment preset="sunset" />
        </Canvas>
    );
}
