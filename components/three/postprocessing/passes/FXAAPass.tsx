import { useRef, VFC } from 'react';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { extend, useThree } from '@react-three/fiber';

extend({ ShaderPass })

export const FXAAPass: VFC = () => {
	const passRef = useRef<ShaderPass>(null)
	const { size } = useThree()

	return (
		<shaderPass
			ref={passRef}
			attachArray="passes"
			args={[FXAAShader]}
			uniforms-resolution-value={[1 / size.width, 1 / size.height]}
		/>
	)
}
