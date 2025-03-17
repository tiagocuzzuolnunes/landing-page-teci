// "use client"; // Se estiver no Next.js App Router

// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
// import { Suspense, useRef, useEffect } from "react";

// function Model() {
//     const { scene } = useGLTF("/anelCopy8.glb");

//     const anelRef = useRef();
//     const cameraRef = useRef();


//     scene.position.set(0, 0, 0);
//     scene.scale.set(1, 1, 1);

//     useFrame(() => {
//         if (cameraRef.current && anelRef.current) {
//             // Ajuste a posição da câmera para seguir o modelo
//             cameraRef.current.position.x = anelRef.current.position.x + 3; // Altere o valor para ajustar a distância
//             cameraRef.current.position.y = anelRef.current.position.y + 3;
//             cameraRef.current.position.z = anelRef.current.position.z + 5; // Ajuste o valor conforme necessário

//             cameraRef.current.lookAt(anelRef.current.position); // Faz a câmera olhar para o modelo
//         }
//     });

//     // Centraliza a geometria do anel, se necessário
//     scene.traverse((child) => {
//         if (child.isMesh) {
//             child.geometry.center(); // Move o pivô para o centro do objeto
//         }
//     });

//     // Usamos useFrame para rotacionar o anel com base nos movimentos do usuário
//     useFrame(() => {
//         if (anelRef.current) {
//             // Aqui o anel irá rotacionar no eixo Y com o movimento do mouse
//             anelRef.current.rotation.y += 0.01;
//         }
//     });

//     return <primitive ref={anelRef} object={scene} />;
// }

// export default function Ring() {
//     return (
//         <Canvas shadows camera={{ position: [4.889, 2.276, 0], fov: 50 }}>
//             {/* <ambientLight intensity={0.5} />
//             <directionalLight position={[5, 10, 5]} intensity={1} castShadow /> */}
//             <Suspense fallback={null}>
//                 <Model />
//             </Suspense>
//             <OrbitControls
               
//             />
//             <Environment preset="sunset" />
//         </Canvas>
//     );
// }





// function SetCamera() {
//     const { camera, gl } = useThree();

//     useEffect(() => {
//         // Definindo a posição da câmera de forma fixa
//         camera.position.set(1, 0, 0); // Ajuste conforme necessário para o seu modelo
//         camera.lookAt(0, 0, 0); // Garante que a câmera esteja olhando para o centro
//         gl.domElement.style.touchAction = 'none'; // Desabilita o movimento da câmera ao clicar
//     }, [camera, gl]);

//     return null;
// }









// import { Canvas, useThree, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import React, { useEffect, useRef } from 'react';

// // Função para ajustar a câmera para visualizar de forma fixa e alinhada
// function SetCamera() {
//     const { camera, gl } = useThree();

//     useEffect(() => {
//         // Definindo a posição da câmera de forma fixa
//         camera.position.set(1, 0, 0); // Ajuste conforme necessário para o seu modelo
//         camera.lookAt(0, 0, 0); // Garante que a câmera esteja olhando para o centro
//         gl.domElement.style.touchAction = 'none'; // Desabilita o movimento da câmera ao clicar
//     }, [camera, gl]);

//     return null;
// }

// function RingModel() {
//     const { scene } = useGLTF('/anelFinal4.glb');
//     const groupRef = useRef();

//     // Fazendo o objeto girar automaticamente ao redor do eixo Y usando rotateOnAxis
//     useFrame(() => {
//         if (groupRef.current) {
//             // Definindo o eixo Y (horizontal)
//             const axis = new THREE.Vector3(0, 1, 0); // Eixo Y
//             const angle = 0.01; // Ângulo de rotação em radianos (ajuste conforme necessário)

//             // Rotacionando o grupo no eixo Y
//             groupRef.current.rotateOnAxis(axis, angle);
//         }
//     });

//     return (
//         <group ref={groupRef}>
//             <primitive object={scene} position={[0, 0, 0]} scale={1} />
//         </group>
//     );
// }

// export default function RingScene() {
//     return (
//         <Canvas>
//             {/* Luz ambiente e luz direcional */}
//             <ambientLight intensity={0.5} />
//             <directionalLight position={[5, 5, 5]} intensity={1} />

//             {/* Carregar o modelo GLB */}
//             <RingModel />

//             {/* Configurar a câmera para ficar fixa */}
//             <SetCamera />

//             {/* OrbitControls para rotação horizontal apenas */}
//             <OrbitControls
//                 enableZoom={true} 
//                 enablePan={false}
//                 enableRotate={false} // Desabilitar rotação da câmera
//                 target={[0, 0, 0]}  // Gira em torno do centro do objeto
//             />
//         </Canvas>
//     );
// }








"use client";
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import React, { useRef, useEffect, useState } from 'react';
import { ObjectControls } from 'threejs-object-controls';

function RingModel() {
    const { scene, camera, gl } = useThree();
    const groupRef = useRef();
    const [controlsReady, setControlsReady] = useState(false);

    useEffect(() => {
        // Verifica se o gl.domElement está disponível
        if (gl && gl.domElement && groupRef.current) {
            const controls = new ObjectControls(camera, gl.domElement, groupRef.current);
            controls.enableRotate = true;  // Ativa rotação
            controls.enableZoom = false;  // Desativa zoom
            controls.enablePan = false;   // Desativa pan
            setControlsReady(true);
        }
    }, [camera, gl]);  // Dependências para atualizar quando a câmera ou gl mudarem

    if (!controlsReady) return null;  // Aguarda o controle estar pronto antes de renderizar

    return (
        <group ref={groupRef}>
            {/* O modelo GLTF é carregado dentro do group */}
            <primitive object={scene} position={[0, 0, 0]} scale={1} />
        </group>
    );
}

export default function RingScene() {
    return (
        <Canvas>
            {/* Luz ambiente e luz direcional */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Carregar o modelo GLB */}
            <RingModel />

            {/* Usar o OrbitControls para manipular a câmera */}
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

            <Environment preset="sunset" />
        </Canvas>
    );
}




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
    const { scene } = useGLTF('/anelFinal.glb');
    const groupRef = useRef();

    // Garantir que a rotação aconteça em torno do centro do objeto sem translação
    useFrame(() => {
        if (groupRef.current) {
            // Aplicar rotação apenas no eixo Y sem afetar a posição
            groupRef.current.rotation.y += 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* O modelo GLTF é carregado dentro do group */}
            <primitive object={scene} position={[0, 0, 0]} scale={1} />
        </group>
    );
}

export default function RingScene() {
    return (
        <Canvas>
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
                enableRotate={false} // Desabilitar rotação da câmera
                target={[0, 0, 0]}  // Gira em torno do centro do objeto
            />
            
        </Canvas>
    );
}
