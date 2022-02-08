import React, { useEffect, useMemo, useRef, VFC } from 'react';
import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { useSnapshot } from 'valtio';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { effectState } from '../../../../../modules/store';
import { ViscosityPixel } from './viscosityPixel';

extend({ ShaderPass })

export const PixelMouseMotionPass: VFC = () => {
	const passRef = useRef<ShaderPass>(null)
	const effectSnap = useSnapshot(effectState)

	const { size } = useThree()

	const viscosityPixel = useMemo(() => new ViscosityPixel(100), [])

	useEffect(() => {
		return () => viscosityPixel.dispose()
	}, [viscosityPixel])

	const shader: THREE.Shader = useMemo(() => {
		return {
			uniforms: {
				tDiffuse: { value: null },
				u_pixelTexture: { value: viscosityPixel.texture }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		}
	}, [viscosityPixel.texture])

	useEffect(() => {
		passRef.current!.enabled = effectSnap.currentName === 'Pixel Mouse Motion'
	}, [effectSnap.currentName])

	useFrame(() => {
		if (passRef.current!.enabled) {
			viscosityPixel.update(size.height / size.width)
			passRef.current!.uniforms.u_pixelTexture.value = viscosityPixel.texture
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
uniform sampler2D u_pixelTexture;
varying vec2 v_uv;

void main() {
  vec4 offset = texture2D(u_pixelTexture, v_uv);
  vec2 uv = v_uv - 0.02 * offset.xy;

  gl_FragColor = texture2D(tDiffuse, uv);
  // gl_FragColor = offset;
}
`
