import React, { Suspense, useEffect, useMemo, useRef, VFC } from 'react';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { useSnapshot } from 'valtio';
import { useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { effectState } from '../../../../../modules/store';
import { RippleRenderer } from './ripple';

extend({ ShaderPass })

export const RippleMouseMotionPass: VFC = () => {
	return (
		<Suspense fallback={null}>
			<Ripple />
		</Suspense>
	)
}

const Ripple: VFC = () => {
	const passRef = useRef<ShaderPass>(null)
	const effectSnap = useSnapshot(effectState)

	const rippleTexture = useTexture('/assets/textures/brush.png')
	const effect = useMemo(() => new RippleRenderer(rippleTexture), [rippleTexture])

	const shader: THREE.Shader = useMemo(() => {
		return {
			uniforms: {
				tDiffuse: { value: null },
				u_displacement: { value: null }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		}
	}, [])

	useEffect(() => {
		passRef.current!.enabled = effectSnap.currentName === 'Ripple Mouse Moiton'
	}, [effectSnap.currentName])

	useEffect(() => {
		return () => effect.dispose()
	}, [effect])

	useFrame(({ gl }) => {
		if (passRef.current!.enabled) {
			effect.update(gl, passRef.current!.uniforms.u_displacement)
		}
	})

	return <shaderPass ref={passRef} attachArray="passes" args={[shader]} />
}

// --------------------------------------------------------
const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform sampler2D u_displacement;
varying vec2 v_uv;

const float PI = 3.141592653589;

void main() {
  vec2 uv = v_uv;
  vec4 disp = texture2D(u_displacement, uv);
  float theta = disp.r * 2.0 * PI;
  vec2 dir = vec2(sin(theta), cos(theta));
  uv += dir * disp.r * 0.1;
  vec4 color = texture2D(tDiffuse, uv);

  gl_FragColor = color;
  // gl_FragColor = texture2D(u_displacement, v_uv);
}
`
