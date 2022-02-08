import React, { VFC } from 'react';
import { css } from '@emotion/react';
import { Layout } from '../components/Layout';
import { SideNavigationLayout } from '../components/SideNavigationLayout';
import { Main } from '../components/skills/Main';
import { Menu } from '../components/skills/Menu';

const Skills: VFC = () => {
	return (
		<Layout title="Nemutas｜Skills" description="Skills I've developed.">
			<div css={styles.container}>
				<SideNavigationLayout title="Skills">
					<Menu />
				</SideNavigationLayout>
				<Main />
			</div>
		</Layout>
	)
}

export default Skills

// ========================================================
// styles

const styles = {
	container: css`
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: auto 1fr;
	`
}
