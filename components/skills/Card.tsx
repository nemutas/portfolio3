import Image from 'next/image';
import React, { useEffect, useRef, VFC } from 'react';
import { useSnapshot } from 'valtio';
import { css } from '@emotion/react';
import { skillState } from '../../modules/store';
import { SkillData } from '../../modules/types';

type CardProps = {
	data: SkillData
}

export const Card: VFC<CardProps> = ({ data }) => {
	const skillSnap = useSnapshot(skillState)
	const cardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (skillSnap.category === 'All') {
			cardRef.current!.classList.remove('disable')
		} else if (skillSnap.category === 'Active') {
			if (!data.isActive) {
				cardRef.current!.classList.add('disable')
			}
		}
	}, [skillSnap.category])

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
			<Image src={`/assets/images/skill/${data.iconName}.png`} width={80} height={80} objectFit="contain" />
			<div css={styles.detail}>
				<div css={styles.text}>{data.name}</div>
				<div css={styles.divider} />
				<div css={styles.subText}>{data.experience}</div>
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
		background-color: #000;
	`,
	text: css`
		padding-left: 5px;
		display: flex;
		align-items: center;
		font-size: 2.5rem;
		white-space: nowrap;
	`,
	subText: css`
		padding-left: 5px;
		display: flex;
		align-items: center;
		font-size: 2rem;
		white-space: nowrap;
	`
}
