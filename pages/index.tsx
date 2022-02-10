import dynamic from 'next/dynamic';
import React, { VFC } from 'react';
import { css } from '@emotion/react';
import { EffectMenu } from '../components/home/EffectMenu';
import { Menu } from '../components/home/Menu';
import { Name } from '../components/home/Name';
import { Profile } from '../components/home/Profile';
import { Layout } from '../components/Layout';

const TCanvas = dynamic(() => import('../components/three/TCanvas'), { ssr: false })

const Home: VFC = () => {
	return (
		<Layout>
			<div css={styles.container}>
				<TCanvas />
				<Name />
				<Menu />
				<Profile />
				<EffectMenu />
			</div>
		</Layout>
	)
}

export default Home

// ========================================================
// styles

const styles = {
	container: css`
		position: relative;
		width: 100%;
		height: 100%;
	`
}
