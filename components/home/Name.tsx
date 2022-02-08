import React, { VFC } from 'react';
import { css } from '@emotion/react';

export const Name: VFC = () => {
	return (
		<div css={styles.container}>
			<div css={styles.mainText}>Nemutas</div>
			<div css={styles.subText}>Web Frontend Engineer {'&'} Creative Corder</div>
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
		color: #000;
	`,
	subText: css`
		font-size: 2rem;
		color: #999;
	`
}
