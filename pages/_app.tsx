import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { localStorageKeys } from '../modules/datas';
import { appState } from '../modules/store';
import { DisplayMode } from '../modules/types';

import type { AppProps } from 'next/app'
function MyApp({ Component, pageProps }: AppProps) {
	const appSnap = useSnapshot(appState)

	useEffect(() => {
		const mode = localStorage.getItem(localStorageKeys.displayMode)
		if (!appSnap.defaultLoaded && mode) {
			appState.displayMode = mode as DisplayMode
			appState.defaultLoaded = true
		}
	}, [])

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}
export default MyApp
