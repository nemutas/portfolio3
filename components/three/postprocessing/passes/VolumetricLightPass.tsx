// --------------------------------------------------------
// Reference
// https://codesandbox.io/s/volumetric-light-w633u
// --------------------------------------------------------

import { useEffect, useMemo, useRef, VFC } from 'react';
import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { useSnapshot } from 'valtio';
import { extend, useFrame } from '@react-three/fiber';
import { GUIController } from '../../../../modules/gui';
import { effectState } from '../../../../modules/store';

extend({ ShaderPass })

const datas = {
	exposure: 0.2,
	decay: 0.95,
	density: 1,
	weight: 0.2,
	samples: 100
}

export const VolumetricLightPass: VFC = () => {
	const passRef = useRef<ShaderPass>(null)
	const effectSnap = useSnapshot(effectState)

	// const gui = GUIController.instance.setFolder('VolumetricLight')
	// gui.addNumericSlider(datas, 'exposure', 0, 1, 0.01)
	// gui.addNumericSlider(datas, 'decay', 0, 1, 0.01)
	// gui.addNumericSlider(datas, 'density', 0, 1, 0.01)
	// gui.addNumericSlider(datas, 'weight', 0, 1, 0.01)
	// gui.addNumericSlider(datas, 'samples', 10, 100, 10)

	const shader: THREE.Shader = useMemo(() => {
		return {
			uniforms: {
				tDiffuse: { value: null },
				u_lightPosition: { value: new THREE.Vector2(0.5, 0.7) },
				u_exposure: { value: datas.exposure },
				u_decay: { value: datas.decay },
				u_density: { value: datas.density },
				u_weight: { value: datas.weight },
				u_samples: { value: datas.samples }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		}
	}, [])

	useEffect(() => {
		passRef.current!.enabled = effectSnap.currentName === 'Volumetric Light'
	}, [effectSnap.currentName])

	useFrame(() => {
		if (passRef.current!.enabled) {
			passRef.current!.uniforms.u_exposure.value = datas.exposure
			passRef.current!.uniforms.u_decay.value = datas.decay
			passRef.current!.uniforms.u_density.value = datas.density
			passRef.current!.uniforms.u_weight.value = datas.weight
			passRef.current!.uniforms.u_samples.value = datas.samples
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
uniform vec2 u_lightPosition;
uniform float u_exposure;
uniform float u_decay;
uniform float u_density;
uniform float u_weight;
uniform int u_samples;
varying vec2 v_uv;

const int MAX_SAMPLES = 100;

void main() {
  vec2 texCoord = v_uv;
  vec2 deltaTextCoord = texCoord - u_lightPosition;
  vec4 color = texture2D(tDiffuse, texCoord);
  deltaTextCoord *= 1.0 / float(u_samples) * u_density;
  float illuminationDecay = 1.0;

  for(int i = 0; i < MAX_SAMPLES; i++) {
    if(i == u_samples) break;
    texCoord -= deltaTextCoord;
    vec4 tex = texture2D(tDiffuse, texCoord);
    tex *= illuminationDecay * u_weight;
    color += tex;
    illuminationDecay *= u_decay;
  }

  gl_FragColor = color * u_exposure;
}
`
