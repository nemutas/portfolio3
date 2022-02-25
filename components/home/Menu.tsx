import Link from 'next/link';
import React, { useRef, VFC } from 'react';
import { css } from '@emotion/react';
import { colorStyles, useColorManager } from '../../modules/colorManager';

export const Menu: VFC = () => {
	const worksRef = useRef<HTMLLIElement>(null)
	const skillsRef = useRef<HTMLLIElement>(null)
	const githubRef = useRef<HTMLLIElement>(null)
	const qiitaRef = useRef<HTMLLIElement>(null)

	useColorManager([worksRef, skillsRef, githubRef, qiitaRef])

	return (
		<nav css={styles.container}>
			<ul css={styles.list}>
				<li ref={worksRef} css={styles.item}>
					<Link href="/works">
						<a>Works</a>
					</Link>
				</li>
				<li ref={skillsRef} css={styles.item}>
					<Link href="/skills">
						<a>Skills</a>
					</Link>
				</li>
				<li ref={githubRef} css={styles.item}>
					<a href="https://github.com/nemutas" target="_blank" rel="noopener noreferrer">
						GitHub
					</a>
				</li>
				<li ref={qiitaRef} css={styles.item}>
					<a href="https://qiita.com/nemutas" target="_blank" rel="noopener noreferrer">
						Qiita
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
		${colorStyles.subText}
	`,
	item: css`
		position: relative;
		width: 100%;
		transition: width 0.5s;

		${colorStyles.textBefore}

		&::before {
			content: '';
			position: absolute;
			bottom: 0;
			width: 0%;
			height: 2px;
			transition: width 0.5s;
		}

		&:hover {
			${colorStyles.mainText}
			&::before {
				width: 100%;
			}
		}
	`
}
