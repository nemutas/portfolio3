import React, { useEffect, useRef, VFC } from 'react';
import { useSnapshot } from 'valtio';
import { css } from '@emotion/react';
import { colorStyles, useColorManager } from '../../modules/colorManager';
import { effects } from '../../modules/datas';
import { effectState } from '../../modules/store';
import { EffectList } from '../../modules/types';

export const EffectMenu: VFC = () => {
	return (
		<div css={styles.container}>
			<ul css={styles.list}>
				{effects.map((effect, i) => (
					<EffectItem key={i} name={effect} />
				))}
			</ul>
		</div>
	)
}

type EffectItemProps = {
	name: EffectList
}

const EffectItem: VFC<EffectItemProps> = ({ name }) => {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const effectSnap = useSnapshot(effectState)

	useColorManager([buttonRef])

	useEffect(() => {
		if (effectSnap.currentName === name) {
			buttonRef.current!.classList.add('current')
		} else {
			buttonRef.current!.classList.remove('current')
		}
	}, [effectSnap.currentName])

	const handleClick = () => {
		effectState.currentName = name
	}

	return (
		<li>
			<button ref={buttonRef} css={styles.button} onClick={handleClick}>
				{name}
			</button>
		</li>
	)
}

// ========================================================
// styles

const styles = {
	container: css`
		position: absolute;
		bottom: 20px;
		right: 30px;
	`,
	list: css`
		width: 300px;
		display: flex;
		flex-direction: column;
		grid-gap: 10px;
		margin: 0;
		padding: 0;
		list-style-type: none;
	`,
	button: css`
		position: relative;
		width: 100%;
		background-color: rgba(0, 0, 0, 0);
		border: none;
		padding: 0;
		text-align: right;
		font-family: 'Poppins', sans-serif;
		font-size: 2.5rem;
		transition: width 0.5s;
		${colorStyles.subText}
		${colorStyles.textAfter}

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			width: 0%;
			height: 2px;
			transform: translate(-100%, 0);
			transition: width 0.5s;
		}

		&:hover {
			${colorStyles.mainText}
			cursor: pointer;
			&::after {
				width: 100%;
			}
		}

		&.current {
			${colorStyles.mainText}
		}
	`
}
