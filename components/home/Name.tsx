import React, { VFC } from 'react';
import { css } from '@emotion/react';
import { colorTheme } from '../../modules/datas';

export const Name: VFC = () => {
	return (
		<div css={styles.container}>
			<div css={styles.mainText}>Nemutas</div>
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
		color: ${colorTheme.light.mainText};
	`,
	subText: css`
		font-size: 2rem;
		color: ${colorTheme.light.subText};
	`
}
