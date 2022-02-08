import Head from 'next/head';
import React, { VFC } from 'react';
import { css } from '@emotion/react';

type LayoutProps = {
	title?: string
	description?: string
	children: React.ReactNode
}

export const Layout: VFC<LayoutProps> = props => {
	const { title = 'Nemutas｜Portfolio', description = "Nemutas's portfolio site.", children } = props
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main css={styles.container}>{children}</main>
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
	`
}
