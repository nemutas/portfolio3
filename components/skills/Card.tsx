import Image from 'next/image';
import React, { useEffect, useMemo, useRef, VFC } from 'react';
import { useSnapshot } from 'valtio';
import { css } from '@emotion/react';
import { colorStyles, useColorManager } from '../../modules/colorManager';
import { appState, skillState } from '../../modules/store';
import { SkillData } from '../../modules/types';

type CardProps = {
	data: SkillData
}

export const Card: VFC<CardProps> = ({ data }) => {
	const skillSnap = useSnapshot(skillState)
	const appSnap = useSnapshot(appState)
	const cardRef = useRef<HTMLDivElement>(null)
	const nameRef = useRef<HTMLDivElement>(null)
	const dividerRef = useRef<HTMLDivElement>(null)
	const experienceRef = useRef<HTMLDivElement>(null)

	useColorManager([nameRef, dividerRef, experienceRef])

	useEffect(() => {
		if (skillSnap.category === 'All') {
			cardRef.current!.classList.remove('disable')
		} else if (skillSnap.category === 'Active') {
			if (!data.isActive) {
				cardRef.current!.classList.add('disable')
			}
		}
	}, [skillSnap.category])

	const invertImageAmount = useMemo(() => {
		let amount = 0
		if (appSnap.displayMode === 'dark') {
			const name = data.iconName
			if (name === 'nextjs' || name === 'three' || name === 'express' || name === 'github') {
				amount = 1
			}
		}
		return amount
	}, [appSnap.displayMode])

	const handleMouseEnter = () => {
		if (!cardRef.current!.classList.contains('disable')) {
			cardRef.current!.classList.add('active')
		}
	}

	const handleMouseLeave = () => {
		cardRef.current!.classList.remove('active')
	}

	return (
		<div ref={cardRef} css={styles.container} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<Image
				css={styles.img(invertImageAmount)}
				src={`/assets/images/skill/${data.iconName}.png`}
				width={80}
				height={80}
				objectFit="contain"
			/>
			<div css={styles.detail}>
				<div ref={nameRef} css={styles.text}>
					{data.name}
				</div>
				<div ref={dividerRef} css={styles.divider} />
				<div ref={experienceRef} css={styles.subText}>
					{data.experience}
				</div>
			</div>
		</div>
	)
}

// ========================================================
// styles

const styles = {
	container: css`
		position: relative;
		width: 80px;
		height: 80px;
		display: grid;
		grid-template-columns: auto 1fr;
		transition: all 0.3s;

		&.active {
			width: 300px;
		}
		&.disable {
			filter: grayscale(100%) opacity(50%);
		}
	`,

	img: (amount: number) => css`
		filter: invert(${amount});
	`,

	detail: css`
		position: absolute;
		left: 85px;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr auto 1fr;
	`,
	divider: css`
		width: 100%;
		height: 1px;
		${colorStyles.textDivider}
	`,
	text: css`
		padding-left: 5px;
		display: flex;
		align-items: center;
		font-size: 2.5rem;
		white-space: nowrap;
		${colorStyles.mainText}
	`,
	subText: css`
		padding-left: 5px;
		display: flex;
		align-items: center;
		font-size: 2rem;
		white-space: nowrap;
		${colorStyles.mainText}
	`
}
