import { useEffect, useMemo, useRef, VFC } from 'react';
import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { useSnapshot } from 'valtio';
import { extend, useFrame } from '@react-three/fiber';
import { fbm21 } from '../../../../modules/glsl/noise';
import { effectState } from '../../../../modules/store';

extend({ ShaderPass })

export const RippleDistortionPass: VFC = () => {
	const passRef = useRef<ShaderPass>(null)
	const effectSnap = useSnapshot(effectState)

	const shader: THREE.Shader = useMemo(() => {
		return {
			uniforms: {
				tDiffuse: { value: null },
				u_time: { value: 0 },
				u_bottom: { value: 0.5 },
				u_speed: { value: 0.5 },
				u_distortion: { value: 5 },
				u_strength: { value: 0.5 }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		}
	}, [])

	useEffect(() => {
		passRef.current!.enabled = effectSnap.currentName === 'Ripple Distortion'
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
uniform float u_bottom;
uniform float u_speed;
uniform float u_distortion;
uniform float u_strength;
varying vec2 v_uv;

${fbm21}

void main() {
  vec2 uv = v_uv;

  float strength = 1.0 - smoothstep(0.0, u_bottom, uv.y);
  strength *= u_strength;

  vec2 surface = vec2(fbm21(u_distortion * uv + u_speed * u_time)); // 0 ~ 1
  surface = mix(vec2(-0.3), vec2(0.3), surface); // -0.3 ~ 0.3
  surface *= strength;

  uv += refract(vec2(0.0), surface, 1.0 / 1.333);

  vec4 texture = texture2D(tDiffuse, uv);
  gl_FragColor = texture;
}
`
