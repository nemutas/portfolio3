import React, { useRef, VFC } from 'react';
import { css } from '@emotion/react';
import { colorStyles, useColorManager } from '../../modules/colorManager';

export const Name: VFC = () => {
	const mainRef = useRef<HTMLDivElement>(null)

	useColorManager([mainRef])

	return (
		<div css={styles.container}>
			<div ref={mainRef} css={styles.mainText}>
				Nemutas
			</div>
			<div css={styles.subText}>Web Frontend Engineer {'&'} Creative Coder</div>
		</div>
	)
}

// ========================================================
// styles

const styles = {
	container: css`
		position: absolute;
		top: 20px;
		left: 30px;
		display: flex;
		flex-direction: column;
		grid-gap: 5px;
	`,
	mainText: css`
		font-size: 5rem;
		line-height: 1;
		${colorStyles.mainText}
	`,
	subText: css`
		font-size: 2rem;
		${colorStyles.subText}
	`
}
