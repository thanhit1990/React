import { useRef, useState, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const handlePointerOver = useCallback((event) => {
    event.stopPropagation()
    hover(true)
  }, [])

  const handlePointerOut = useCallback(() => {
    hover(false)
  }, [])

  const scale = useMemo(() => (clicked ? 1.5 : 1), [clicked])
  const color = useMemo(() => (hovered ? 'hotpink' : 'orange'), [hovered])

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
  })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={scale}
      onClick={() => click(!clicked)}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
};

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls />
    </Canvas>
  )
};