import { useEffect, useMemo, useRef, VFC } from 'react';
import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { useSnapshot } from 'valtio';
import { extend } from '@react-three/fiber';
import { effectState } from '../../../../modules/store';

extend({ ShaderPass })

export const RGBShiftPass: VFC = () => {
	const passRef = useRef<ShaderPass>(null)
	const effectSnap = useSnapshot(effectState)

	const shader: THREE.Shader = useMemo(() => {
		return {
			uniforms: {
				tDiffuse: { value: null },
				u_direction: { value: 0 },
				u_strength: { value: 1 }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		}
	}, [])

	useEffect(() => {
		passRef.current!.enabled = effectSnap.currentName === 'RGB Shift'
	}, [effectSnap.currentName])

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
uniform float u_direction;
uniform float u_strength;
varying vec2 v_uv;

const float PI = 3.141592653589;

vec2 rotate2D(vec2 v, float rad) {
	float s = sin(rad);
	float c = cos(rad);
	return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
}

void main() {
	float rad = 2.0 * PI * u_direction / 360.0;
	vec2 dir = rotate2D(vec2(1.0, 0.0), rad);
	
  vec2 uv1 = v_uv + -dir * u_strength * 0.01;
	vec2 uv2 = v_uv;
  vec2 uv3 = v_uv + dir * u_strength * 0.01;

  vec4 t1 = texture2D(tDiffuse, uv1);
  vec4 t2 = texture2D(tDiffuse, uv2);
  vec4 t3 = texture2D(tDiffuse, uv3);

  vec4 color = vec4(t1.r, t2.g, t3.b, 1.0);
  
  gl_FragColor = color;
}
`
