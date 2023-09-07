import { Canvas, useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import {
    useGLTF,
    OrbitControls,
    ContactShadows,
    useFBX,
    Environment
} from '@react-three/drei'
import { useControls } from 'leva'

const MODELS = {
    Beech: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-beech/model.gltf',
    Lime: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf',
    Spruce: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf',
    House: '/wood_house.glb'
}

const SCALE = {
    Beech: [1, 1, 1],
    Lime: [1, 1, 1],
    Spruce: [1, 1, 1],
    House: [5, 5, 5]
}

export default function MyApp() {
    const { model } = useControls({ model: { value: 'Beech', options: Object.keys(MODELS) } })
    return (
        <>
            {/* <header>This is a {model.toLowerCase()} tree.</header> */}
            <Canvas camera={{ position: [-10, 10, 40], fov: 50 }}>
                <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
                <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
                <group position={[0, -10, 0]}>
                    <Model position={[0, 0.25, 0]} scale={SCALE[model]} url={MODELS[model]} />
                    <ContactShadows scale={20} blur={10} far={20} />
                    <Environment files="/resting.hdr" background />
                </group>
                <OrbitControls />
            </Canvas>
        </>
    )
}

function Model({ url, ...props }) {
    const { scene } = useGLTF(url)
    // <primitive object={...} mounts an already existing object
    return <primitive object={scene} {...props} />
}

function OBJMOdel({ url, ...props }) {
    const obj = useLoader(OBJLoader, url)
    return <primitive object={obj} {...props} />
}

function FBXModel({ url, ...props }) {
    const fbx = useLoader(FBXLoader, url)
    return <primitive object={fbx} {...props} />
}

function FBXModel2({ url, ...props }) {
    const fbx = useFBX(url)
    return <primitive object={fbx} {...props} />
}

// Silently pre-load all models
Object.values(MODELS).forEach(useGLTF.preload)
