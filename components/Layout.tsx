import Head from 'next/head';
import React, { useRef, VFC } from 'react';
import { css } from '@emotion/react';
import { colorStyles, useColorManager } from '../modules/colorManager';

type LayoutProps = {
	title?: string
	description?: string
	children: React.ReactNode
}

export const Layout: VFC<LayoutProps> = props => {
	const { title = 'Nemutas｜Portfolio', description = "Nemutas's portfolio site.", children } = props
	const mainRef = useRef<HTMLDivElement>(null)

	useColorManager([mainRef])

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main ref={mainRef} css={styles.container}>
				{children}
			</main>
		</>
	)
}

// ========================================================
// styles

const styles = {
	container: css`
		position: relative;
		width: 100vw;
		height: 100vh;
		${colorStyles.background}
	`
}
