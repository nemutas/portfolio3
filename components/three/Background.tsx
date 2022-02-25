import React, { useEffect, useMemo, VFC } from 'react';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { useFrame, useThree } from '@react-three/fiber';
import { appState } from '../../modules/store';

export const Background: VFC = () => {
	const appSnap = useSnapshot(appState)
	const { scene } = useThree()

	const colors = useMemo(() => {
		const light = new THREE.Color('#fff')
		const dark = new THREE.Color('#151515')
		light.convertSRGBToLinear()
		dark.convertSRGBToLinear()
		return { light, dark }
	}, [])

	scene.background = appSnap.displayMode === 'light' ? colors.light : colors.dark

	return null
}
