import React, { useEffect, useRef, VFC } from 'react';
import { useSnapshot } from 'valtio';
import { css } from '@emotion/react';
import { colorTheme, years } from '../../modules/datas';
import { workState } from '../../modules/store';
import { Years } from '../../modules/types';

export const Menu: VFC = () => {
	return (
		<ul css={styles.list}>
			{years.map(year => (
				<Item key={year} year={year} />
			))}
		</ul>
	)
}

type ItemProps = {
	year: Years
}

const Item: VFC<ItemProps> = ({ year }) => {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const workSnap = useSnapshot(workState)

	useEffect(() => {
		if (workSnap.year === year) {
			buttonRef.current!.classList.add('current')
		} else {
			buttonRef.current!.classList.remove('current')
		}
	}, [workSnap.year])

	const handleClick = () => {
		workState.year = year
	}

	return (
		<li>
			<button ref={buttonRef} css={styles.button} onClick={handleClick}>
				{year}
			</button>
		</li>
	)
}

// ========================================================
// styles

const styles = {
	list: css`
		width: 150px;
		display: flex;
		flex-direction: column;
		grid-gap: 10px;
		margin: 0;
		padding: 0;
		list-style-type: none;
		font-size: 3rem;
		color: ${colorTheme.light.subText};
	`,
	button: css`
		position: relative;
		width: 100%;
		background-color: rgba(0, 0, 0, 0);
		border: none;
		padding: 0;
		text-align: left;
		font-family: 'Roboto', sans-serif;
		font-size: 3rem;
		color: ${colorTheme.light.subText};
		transition: all 0.5s;

		&::before {
			content: '';
			position: absolute;
			bottom: 0;
			width: 0%;
			height: 2px;
			background-color: ${colorTheme.light.mainText};
			transition: all 0.5s;
		}

		&:hover {
			color: ${colorTheme.light.mainText};
			cursor: pointer;
			&::before {
				width: 100%;
			}
		}

		&.current {
			color: ${colorTheme.light.mainText};
		}
	`
}
