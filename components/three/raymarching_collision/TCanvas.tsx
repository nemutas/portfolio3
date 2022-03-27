import { VFC } from 'react';
import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Effects } from '../postprocessing/Effects';
import { BloomPass } from '../postprocessing/passes/BloomPass';
import { FXAAPass } from '../postprocessing/passes/FXAAPass';
import { ScreenPlane } from './ScreenPlane';
import { Simulator } from './Simulator';

export default function TCanvas() {
	return (
		<Canvas
			camera={{
				position: [0, 0, 15],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}>
			{/* simulator */}
			<Simulator />
			{/* objects */}
			<ScreenPlane />
			{/* effects */}
			<Effects sRGBCorrection={false}>
				<FXAAPass />
				<BloomPass />
			</Effects>
			{/* helper */}
			{/* <Stats /> */}
		</Canvas>
	)
}
