import Link from 'next/link';
import React, { VFC } from 'react';
import { css } from '@emotion/react';
import { colorTheme } from '../modules/datas';

type SideNavigationLayoutProps = {
	title: string
	subText?: string
	children: React.ReactNode
}

export const SideNavigationLayout: VFC<SideNavigationLayoutProps> = props => {
	const { title, subText, children } = props
	return (
		<div css={styles.container}>
			<div css={styles.contentsContainer}>
				<div css={styles.titleContainer}>
					<div css={styles.title}>{title}</div>
					{subText && <div css={styles.sub}>{subText}</div>}
				</div>
				<nav css={styles.nav}>{children}</nav>
				<Link href="/">
					<a css={styles.toHome}>Home</a>
				</Link>
			</div>
			<div css={styles.divider} />
		</div>
	)
}

// ========================================================
// styles

const styles = {
	container: css`
		position: relative;
		width: 400px;
		height: 100vh;
		padding: 20px 30px;
		padding-right: 0;
		display: grid;
		align-items: center;
		grid-template-columns: 1fr auto;
	`,
	contentsContainer: css`
		position: relative;
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;
	`,
	titleContainer: css`
		display: flex;
		flex-direction: column;
		grid-gap: 5px;
	`,
	title: css`
		font-size: 5rem;
		line-height: 1;
		color: ${colorTheme.light.mainText};
	`,
	sub: css`
		font-size: 2rem;
		color: ${colorTheme.light.subText};
	`,
	nav: css`
		padding-top: 60px;
		width: 100%;
		height: 100%;
	`,
	toHome: css`
		position: relative;
		width: 130px;
		font-size: 2.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: ${colorTheme.light.mainText};

		&::before,
		&::after {
			content: '';
			position: absolute;
			left: 0;
			width: 15px;
			height: 2px;
			transform-origin: left;
			background-color: ${colorTheme.light.mainText};
			transition: all 0.3s;
		}

		&:hover {
			cursor: pointer;

			&::before {
				transform: rotate(-45deg);
			}
			&::after {
				transform: rotate(45deg);
			}
		}
	`,
	divider: css`
		position: relative;
		width: 2px;
		height: 100%;
		background-color: ${colorTheme.light.divider};
	`
}
