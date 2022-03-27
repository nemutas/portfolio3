import { VFC } from 'react';

export const Lights: VFC = () => {
	return (
		<>
			<ambientLight intensity={0.2} />
			<pointLight position={[0, 5, 0]} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
		</>
	)
}
