import * as THREE from 'three';
import { Mouse } from './mouse';

export class ViscosityPixel {
	texture: THREE.DataTexture

	private _mouse

	constructor(private _size: number) {
		this.texture = this._createTexture()
		// add mouse event
		this._mouse = new Mouse()
	}

	private _createTexture = () => {
		const dataSize = this._size * this._size
		const dataArray = []

		for (let i = 0; i < dataSize; i++) {
			dataArray.push(0, 0, 0, 0)
		}
		const data = Float32Array.from(dataArray)
		return new THREE.DataTexture(data, this._size, this._size, THREE.RGBAFormat, THREE.FloatType)
	}

	private _clamp = (value: number, min: number, max: number) => {
		return Math.max(min, Math.min(value, max))
	}

	/**
	 * Textureの更新
	 * @param aspect 描画領域の縦横比（height / width）
	 * @param relaxation 効果の持続時間
	 * @param range 効果の範囲
	 * @param strength 効果の強さ
	 */
	update = (aspect: number, relaxation = 0.9, range = 0.15, strength = 0.35) => {
		let data = this.texture.image.data

		for (let i = 0; i < data.length; i += 4) {
			data[i] *= relaxation
			data[i + 1] *= relaxation
		}

		// マウスの現在のグリッド位置
		let gridMouseX = this._size * this._mouse.datas.x
		let gridMouseY = this._size * (1 - this._mouse.datas.y)
		// 最大の影響範囲
		let maxDist = this._size * range

		for (let ix = 0; ix < this._size; ix++) {
			for (let iy = 0; iy < this._size; iy++) {
				// 現在のグリッドからの各グリッドの距離（正円）
				let distance = Math.sqrt((gridMouseX - ix) ** 2 / aspect + (gridMouseY - iy) ** 2)

				if (distance < maxDist) {
					let index = 4 * (ix + this._size * iy)

					let power = maxDist / distance
					power = this._clamp(power, 0, 10)

					data[index] += strength * 100 * this._mouse.datas.vX * power
					data[index + 1] -= strength * 100 * this._mouse.datas.vY * power
				}
			}
		}

		this._mouse.datas.vX *= 0.9
		this._mouse.datas.vY *= 0.9
		this.texture.needsUpdate = true
	}

	dispose = () => {
		this._mouse.dispose()
	}
}
