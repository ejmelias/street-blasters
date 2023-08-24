"use client"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, ScrollControls, Scroll } from "@react-three/drei"
import Overlay from "@/components/Overlay"
import Model from "@/components/Model"

export default function Home() {

	return (
        <div className='fixed w-screen h-screen m-0 p-0 bg-[#101010] bg-gradient-to-b from-[#101010] from-0% to-[#212121] to-80%'>
            <Suspense fallback={<LoadingSpinner />}>
                <Canvas shadows eventPrefix="client">
                    <ScrollControls pages={6} >
                        <ambientLight intensity={1} />
                        <Suspense fallback={null}>
                            <Model />
                            <Environment preset="city" />
                        </Suspense>
                        <Scroll html>
                            <Overlay />
                        </Scroll>
                    </ScrollControls>
                </Canvas>
            </Suspense>
		</div>
	)
}

const LoadingSpinner = () => (
    <div className="fixed inset-0 flex items-center justify-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40px"
            height="40px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="animate-spin"
        >
            <circle cx="50" cy="50" fill="none" stroke="#000" opacity={0.2} strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                ></animateTransform>
            </circle>
        </svg>
    </div>
)
