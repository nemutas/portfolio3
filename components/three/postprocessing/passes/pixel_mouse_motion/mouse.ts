export class Mouse {
	/** 正規化されたマウスの位置と速度 */
	datas = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 }

	constructor() {
		document.addEventListener('mousemove', this._handleMousemove)
	}

	private _handleMousemove = (e: MouseEvent) => {
		this.datas.x = e.clientX / window.innerWidth
		this.datas.y = e.clientY / window.innerHeight
		// console.log(this.datas.x, this.datas.y)

		this.datas.vX = this.datas.x - this.datas.prevX
		this.datas.vY = this.datas.y - this.datas.prevY
		// console.log(this.datas.vX, this.datas.vY)

		this.datas.prevX = this.datas.x
		this.datas.prevY = this.datas.y
	}

	dispose = () => {
		document.removeEventListener('mousemove', this._handleMousemove)
	}
}
