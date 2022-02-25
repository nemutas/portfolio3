import Image from 'next/image';
import React, { useRef, VFC } from 'react';
import { useSnapshot } from 'valtio';
import { css } from '@emotion/react';
import { localStorageKeys } from '../../modules/datas';
import { appState } from '../../modules/store';

export const DisplayModeButton: VFC = () => {
	const appSnap = useSnapshot(appState)

	const handleClick = () => {
		const mode = appSnap.displayMode === 'light' ? 'dark' : 'light'
		appState.displayMode = mode
		appState.transition = true

		localStorage.setItem(localStorageKeys.displayMode, mode)
	}

	return (
		<button css={styles.container} onClick={handleClick}>
			{appSnap.displayMode === 'light' ? (
				<Image src={`/assets/images/app/moon.png`} width={30} height={30} objectFit="contain" />
			) : (
				<Image src={`/assets/images/app/sun.png`} width={30} height={30} objectFit="contain" />
			)}
		</button>
	)
}

const styles = {
	container: css`
		position: absolute;
		top: 20px;
		right: 30px;
		background-color: rgba(0, 0, 0, 0);
		border: none;

		&:hover {
			cursor: pointer;
		}
	`
}
