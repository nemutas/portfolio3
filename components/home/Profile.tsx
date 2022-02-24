import React, { useRef, VFC } from 'react';
import { css } from '@emotion/react';
import { colorTheme } from '../../modules/datas';

export const Profile: VFC = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLButtonElement>(null)
	const dividerRef = useRef<HTMLDivElement>(null)

	const handleClick = () => {
		containerRef.current!.classList.toggle('active')
		titleRef.current!.classList.toggle('active')
		dividerRef.current!.classList.toggle('active')
	}

	return (
		<div ref={containerRef} css={styles.container}>
			<button ref={titleRef} css={styles.title} onClick={handleClick}>
				Profile
			</button>
			<div css={styles.detailContainer}>
				<div ref={dividerRef} css={styles.divider} />
				<Block title="Name">Not disclosed</Block>
				<Block title="Birthday">August 5, 1991.</Block>
				<Block title="Address">Tokyo, Japan</Block>
				<Block title="Contact">
					<a css={styles.link} href="https://twitter.com/focru_ino" target="_blank" rel="noopener noreferrer">
						Twitter DM
					</a>
				</Block>
				<Block title="Message">Currently looking for a job. Please contact me via Twitter DM.</Block>
			</div>
		</div>
	)
}

const Block: VFC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
	return (
		<div>
			<div css={styles.subTitle}>{title}</div>
			<div css={styles.text}>{children}</div>
		</div>
	)
}

// ========================================================
// styles

const styles = {
	container: css`
		position: absolute;
		bottom: 20px;
		left: 30px;
		width: 300px;

		transform: translate(0, 91%);
		transition: all 0.5s;

		&.active {
			transform: translate(0, 0%);
		}
	`,
	title: css`
		position: relative;
		background-color: rgba(0, 0, 0, 0);
		border: none;
		padding: 0;
		font-family: 'Poppins', sans-serif;
		font-size: 3rem;
		color: ${colorTheme.light.subText};
		transition: all 0.5s;

		&:hover {
			color: ${colorTheme.light.mainText};
			cursor: pointer;
		}

		&.active {
			color: ${colorTheme.light.mainText};
		}
	`,
	detailContainer: css`
		display: flex;
		flex-direction: column;
		grid-gap: 5px;
	`,
	divider: css`
		width: 0%;
		height: 2px;
		background-color: ${colorTheme.light.mainText};
		transition: all 0.5s;

		&.active {
			transition: all 0.5s 0.5s;
			width: 100%;
		}
	`,
	subTitle: css`
		font-size: 1.5rem;
		color: ${colorTheme.light.subText};
	`,
	text: css`
		padding-left: 20px;
		font-size: 2rem;
		color: ${colorTheme.light.mainText};
	`,
	link: css`
		position: relative;
		display: flex;
		align-items: center;
		width: 140px;

		&::before,
		&::after {
			content: '';
			position: absolute;
			right: 0;
			width: 20px;
			height: 1px;
			background-color: ${colorTheme.light.mainText};
			transform-origin: right;
			transition: all 0.3s;
		}

		&:hover {
			&::before {
				transform: rotate(45deg);
				width: 10px;
			}
			&::after {
				transform: rotate(-45deg);
				width: 10px;
			}
		}
	`
}
