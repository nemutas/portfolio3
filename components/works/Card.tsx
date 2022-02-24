import Image from 'next/image';
import React, { VFC } from 'react';
import { css } from '@emotion/react';
import { colorTheme } from '../../modules/datas';
import { WorkDataDetail } from '../../modules/types';

type CardProps = {
	order: number
	data: WorkDataDetail
}

export const Card: VFC<CardProps> = ({ order, data }) => {
	const handleClick = () => {
		window.open(data.app, '_blank', 'noopener noreferrer')
	}

	return (
		<div css={styles.container}>
			<Image src={data.image} css={styles.image} layout="fill" objectFit="cover" onClick={handleClick} />
			<div css={styles.titleContainer}>
				<div css={styles.title}>
					<span css={styles.order}>{order.toString().padStart(2, '0') + '. '}</span>
					{data.title}
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
		width: 100%;
		height: 100%;
	`,
	titleContainer: css`
		position: absolute;
		bottom: 0px;
		width: 100%;
		padding: 5px;
		padding-left: 10px;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(2px);
	`,
	image: css`
		transition: transform 0.3s;

		&:hover {
			transform: scale(1.1);
			cursor: pointer;
		}
	`,
	order: css`
		font-family: 'Roboto', sans-serif;
	`,
	title: css`
		color: ${colorTheme.light.appText};
		font-size: 2.5rem;
	`
}
