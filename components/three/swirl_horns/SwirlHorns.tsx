import { useCallback, useEffect, useRef, VFC } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const SwirlHorns: VFC = () => {
	const groupRef = useRef<THREE.Group>(null)

	useFrame(() => {
		groupRef.current!.rotation.y -= 0.005
	})

	return (
		<group ref={groupRef}>
			<SwirlHorn />
			<SwirlHorn rotation={[0, Math.PI, 0]} />
		</group>
	)
}

// ========================================================
type SwirlHornProps = {
	rotation?: [number, number, number]
}

const SwirlHorn: VFC<SwirlHornProps> = ({ rotation }) => {
	const meshRef = useRef<THREE.InstancedMesh>(null)

	// box amount
	const role = 2
	const amount = 200 * role

	const updateMatrix = useCallback(
		(delta: number) => {
			const object = new THREE.Object3D()

			const getPosition = (i: number) => {
				const theta = (i / amount) * 2 * Math.PI * role
				const x = 3 * Math.sin(theta)
				const z = 3 * Math.cos(theta)
				const y = Math.pow(i / amount + 0.8, 5)
				return new THREE.Vector3(x, y, z)
			}

			for (let i = 0; i < amount; i++) {
				// scale
				let scale = Math.sqrt(1 - Math.pow(i / amount, 2))
				scale = Math.pow(scale, 1.5)

				const currentPos = getPosition(i)
				const nextPos = getPosition(i + 1)

				object.position.set(currentPos.x, currentPos.y, currentPos.z)
				object.scale.set(scale, scale, 1)
				object.lookAt(nextPos)
				object.rotation.z += (i / amount) * 2 * Math.PI * 0.5 * role + delta
				object.updateMatrix()
				meshRef.current!.setMatrixAt(i, object.matrix)
			}

			meshRef.current!.instanceMatrix.needsUpdate = true
		},
		[amount]
	)

	// init position matrix
	useEffect(() => {
		updateMatrix(0)
	}, [updateMatrix])

	useFrame(({ clock }) => {
		updateMatrix(-clock.getElapsedTime() * 0.5)
	})

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, amount]} rotation={rotation} castShadow receiveShadow>
			<boxGeometry args={[1, 1, 0.05]} />
			<meshStandardMaterial />
		</instancedMesh>
	)
}
