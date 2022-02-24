import React, { useEffect, useRef, VFC } from 'react';
import { useSnapshot } from 'valtio';
import { css } from '@emotion/react';
import { colorTheme, skillCategories } from '../../modules/datas';
import { skillState } from '../../modules/store';
import { SkillCategories } from '../../modules/types';

export const Menu: VFC = () => {
	return (
		<ul css={styles.list}>
			{skillCategories.map((category, i) => (
				<Item key={i} category={category} />
			))}
		</ul>
	)
}

type ItemProps = {
	category: SkillCategories
}

const Item: VFC<ItemProps> = ({ category }) => {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const skillSnap = useSnapshot(skillState)

	useEffect(() => {
		if (skillSnap.category === category) {
			buttonRef.current!.classList.add('current')
		} else {
			buttonRef.current!.classList.remove('current')
		}
	}, [skillSnap.category])

	const handleClick = () => {
		skillState.category = category
	}

	return (
		<li>
			<button ref={buttonRef} css={styles.button} onClick={handleClick}>
				{category}
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
			color: #000;
		}
	`
}
