"use client"
import * as THREE from "three"
import { useRef, useState, useEffect } from "react"
import { useGLTF, PerspectiveCamera, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { gsap } from "gsap"

const color = new THREE.Color()
const hoverColor = new THREE.Color()
const colors = ["#FF5555", "#6E9DBD", "#6FA868", "#A569FF", "#FFD966", "#FFA34F"]

export default function Model( props ) {
    const models = useRef()
    const camera = useRef()
    const data = useScroll()
    const { nodes} = useGLTF("/model3.glb")
    const [hovered, setHovered] = useState()
    const extras = { receiveShadow: true, castShadow: true, "material-envMapIntensity": 0.2 }

    useEffect(() => {
        if (hovered) {
            models.current.getObjectByName(hovered).material.color.set("white")
            hoverColor.set(colors[Math.floor(Math.random() * colors.length)])
        }
        document.body.style.cursor = hovered ? "pointer" : "auto"
    }, [hovered])

    useFrame((state, delta) => {
        models.current.children.forEach((child, index) => {
            child.material.color.lerp(color.set(hovered === child.name ? hoverColor : "#202020"), hovered ? 0.1 : 0.05)
            const et = state.clock.elapsedTime
            child.position.y += Math.sin((et + index * 2000) / 2) * 1 * delta
            child.rotation.x += Math.sin((et + index * 2000) / 3) / 10 * delta
            child.rotation.y += Math.cos((et + index * 2000) / 2) / 10 * delta
            child.rotation.z += Math.sin((et + index * 2000) / 3) / 10 * delta
        })
        
        camera.current.rotation.y = -data.range(0, 1) * 8
        camera.current.position.y = -data.range(0, 1) * 47
    })

    const spin = (index) => {
        gsap.to(
            models.current.children[index].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                y: '+= 6',
                x: '+= 2',
                z: '+= 1'
            }
        )
    }

    return (
        <group {...props} >
            <group
                onPointerOver={(e) => (e.stopPropagation(), setHovered(e.object.name))}
                onPointerOut={(e) => (e.stopPropagation(), setHovered(null))}
                scale={0.25}
                ref={models}
            >
                
                <mesh name="Pipe" geometry={nodes.Pipe.geometry} {...extras} onClick={() => spin(0)} position={[0, 0, 70]}><meshPhongMaterial /></mesh>
                <mesh name="Cinderblock" geometry={nodes.Cinderblock.geometry} {...extras} onClick={() => spin(1)} position={[-50, -40, 0]} ><meshPhongMaterial /></mesh>
                <mesh name="Rabbit" geometry={nodes.Rabbit.geometry} {...extras} onClick={() => spin(2)} position={[0, -80, -70]} ><meshPhongMaterial /></mesh>
                <mesh name="Knight" geometry={nodes.Knight.geometry} {...extras} onClick={() => spin(3)} position={[50, -120, 0]} ><meshPhongMaterial /></mesh>
                <mesh name="Jet" geometry={nodes.Jet.geometry} {...extras} onClick={() => spin(4)} position={[0, -160, 70]} ><meshPhongMaterial /></mesh>
                <mesh name="Laptop" geometry={nodes.Laptop.geometry} {...extras} onClick={() => spin(5)} position={[-50, -195, 0]} ><meshPhongMaterial /></mesh>
            </group>
            <group ref={camera} >
                <PerspectiveCamera makeDefault far={100} near={0.1} fov={28}  position={[0, 0, 50]}>
                    <directionalLight
                        castShadow
                        position={[10, 20, 15]}
                        shadow-camera-right={8}
                        shadow-camera-top={8}
                        shadow-camera-left={-8}
                        shadow-camera-bottom={-8}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        intensity={5}
                        shadow-bias={-0.0001}
                    />
                </PerspectiveCamera>
            </group>
        </group>
    )
}

useGLTF.preload("/model3.glb")
