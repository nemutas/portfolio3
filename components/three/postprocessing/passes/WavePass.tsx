import { useEffect, useMemo, useRef, VFC } from 'react';
import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { useSnapshot } from 'valtio';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { effectState } from '../../../../modules/store';

extend({ ShaderPass })

export const WavePass: VFC = () => {
	const passRef = useRef<ShaderPass>(null)
	const effectSnap = useSnapshot(effectState)

	const { size } = useThree()

	const shader: THREE.Shader = useMemo(() => {
		return {
			uniforms: {
				tDiffuse: { value: null },
				u_time: { value: 0 },
				u_aspect: { value: 1 },
				u_speed: { value: 8 },
				u_amplitude: { value: 1.5 },
				u_frequency: { value: 40 }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		}
	}, [])

	useEffect(() => {
		passRef.current!.enabled = effectSnap.currentName === 'Wave'
	}, [effectSnap.currentName])

	useFrame(() => {
		if (passRef.current!.enabled) {
			passRef.current!.uniforms.u_time.value += 0.01
		}
	})

	return (
		<shaderPass ref={passRef} attachArray="passes" args={[shader]} uniforms-u_aspect-value={size.width / size.height} />
	)
}

const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform float u_time;
uniform float u_aspect;
uniform float u_speed;
uniform float u_amplitude;
uniform float u_frequency;
varying vec2 v_uv;

void main() {
  // center to 0
  vec2 uv = v_uv - 0.5;
  
  // decay
  float length_from_center = length(uv * vec2(u_aspect, 1.0));
  length_from_center = pow(length_from_center, 0.4);

  float offset = u_amplitude * sin(-u_time * u_speed + length_from_center * u_frequency);
  offset = (offset + 1.0) * 0.5;
  uv -= normalize(uv) * offset * 0.1;
  
  // center to 0.5
  uv += 0.5;

  vec4 color = texture2D(tDiffuse, uv);
  
  gl_FragColor = color;
}
`
