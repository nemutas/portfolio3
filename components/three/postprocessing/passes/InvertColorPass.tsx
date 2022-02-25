import { useEffect, useMemo, useRef, VFC } from 'react';
import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { useSnapshot } from 'valtio';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { cnoise31 } from '../../../../modules/glsl/noise';
import { effectState } from '../../../../modules/store';

extend({ ShaderPass })

export const InvertColorPass: VFC = () => {
	const effectSnap = useSnapshot(effectState)
	const passRef = useRef<ShaderPass>(null)

	const shader: THREE.Shader = useMemo(() => {
		return {
			uniforms: {
				tDiffuse: { value: null },
				u_time: { value: 0 },
				u_strength: { value: 0.8 }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		}
	}, [])

	useEffect(() => {
		passRef.current!.enabled = effectSnap.currentName === 'Invert Color'
	}, [effectSnap.currentName])

	useFrame(() => {
		if (passRef.current!.enabled) {
			passRef.current!.uniforms.u_time.value += 0.01
		}
	})

	return <shaderPass ref={passRef} attachArray="passes" args={[shader]} />
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
uniform float u_strength;
varying vec2 v_uv;

const float complexity = 5.0;
const float speed = 0.3;
const float scale = 2.0;

${cnoise31}

void main() {
	vec2 uv = v_uv;

  float noise = cnoise31(vec3(uv.y, uv.x, 1.0) * complexity + u_time * speed) * scale;
  noise = 1.0 - smoothstep(0.2, 0.21, noise);

  vec4 texture = texture2D(tDiffuse, uv);
  vec3 inv = clamp(u_strength - texture.rgb, 0.02, 1.0);
  vec3 color = mix(inv, texture.rgb, noise);
  
  gl_FragColor = vec4(color, texture.a);
}
`
