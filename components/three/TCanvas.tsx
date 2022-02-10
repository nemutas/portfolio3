import React, { useCallback, useEffect, useRef, VFC } from 'react';
import THREE from 'three';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Lights } from './Lights';
import { Effects } from './postprocessing/Effects';
import { DistortionPass } from './postprocessing/passes/DistortionPass';
import { FXAAPass } from './postprocessing/passes/FXAAPass';
import { InvertColorPass } from './postprocessing/passes/InvertColorPass';
import {
	PixelMouseMotionPass
} from './postprocessing/passes/pixel_mouse_motion/PixelMouseMotionPass';
import { RGBShiftPass } from './postprocessing/passes/RGBShift';
import {
	RippleMouseMotionPass
} from './postprocessing/passes/ripple_mouse_motion/RippleMouseMotionPass';
import { RippleDistortionPass } from './postprocessing/passes/RippleDistortionPass';
import { VolumetricLightPass } from './postprocessing/passes/VolumetricLightPass';
import { WavePass } from './postprocessing/passes/WavePass';
import { SwirlHorns } from './SwirlHorns';

export default function TCanvas() {
	return (
		<Canvas
			camera={{
				position: [0, 5, 20],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}
			shadows
			onCreated={({ camera }) => camera.lookAt(0, 10, 0)}>
			{/* scene */}
			<color attach="background" args={['#fff']} />
			{/* lights */}
			<Lights />
			{/* objects */}
			<SwirlHorns />
			{/* effects */}
			<Effects sRGBCorrection>
				<DistortionPass />
				<RGBShiftPass />
				<InvertColorPass />
				<RippleDistortionPass />
				<VolumetricLightPass />
				<WavePass />
				<RippleMouseMotionPass />
				<PixelMouseMotionPass />
				{/* anti-aliasing */}
				<FXAAPass />
			</Effects>
		</Canvas>
	)
}
