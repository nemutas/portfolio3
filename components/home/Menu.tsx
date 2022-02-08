import Link from 'next/link';
import React, { VFC } from 'react';
import { css } from '@emotion/react';

export const Menu: VFC = () => {
	return (
		<nav css={styles.container}>
			<ul css={styles.list}>
				<li css={styles.item}>
					<Link href="/works">
						<a>Works</a>
					</Link>
				</li>
				<li css={styles.item}>
					<Link href="/skills">
						<a>Skills</a>
					</Link>
				</li>
				<li css={styles.item}>
					<a href="https://github.com/nemutas" target="_blank" rel="noopener noreferrer">
						GitHub
					</a>
				</li>
				<li css={styles.item}>
					<a href="https://qiita.com/nemutas" target="_blank" rel="noopener noreferrer">
						Qiita
					</a>
				</li>
				<li css={styles.item}>
					<a href="https://twitter.com/focru_ino" target="_blank" rel="noopener noreferrer">
						Twitter
					</a>
				</li>
			</ul>
		</nav>
	)
}

// ========================================================
// styles

const styles = {
	container: css`
		position: absolute;
		top: 150px;
		left: 30px;
	`,
	list: css`
		width: 150px;
		display: flex;
		flex-direction: column;
		grid-gap: 10px;
		margin: 0;
		padding: 0;
		list-style-type: none;
		font-size: 3rem;
		color: #999;
	`,
	item: css`
		position: relative;
		width: 100%;
		transition: all 0.5s;

		&::before {
			content: '';
			position: absolute;
			bottom: 0;
			width: 0%;
			height: 2px;
			background-color: #000;
			transition: all 0.5s;
		}

		&:hover {
			color: #000;
			&::before {
				width: 100%;
			}
		}
	`
}
