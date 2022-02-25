import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useSnapshot } from 'valtio';
import { css } from '@emotion/react';
import { appState } from './store';

export const useColorManager = (refs: React.RefObject<HTMLElement>[], addTransition = true) => {
	const appSnap = useSnapshot(appState)

	useEffect(() => {
		refs.forEach(ref => {
			if (ref.current !== null) {
				if (appSnap.displayMode === 'dark') {
					ref.current.classList.add('dark')
				} else {
					ref.current.classList.remove('dark')
				}

				if (addTransition) {
					if (appSnap.transition) {
						ref.current.classList.add('transition')
						ref.current.ontransitionend = () => (appState.transition = false)
					} else {
						ref.current.classList.remove('transition')
					}
				}
			}
		})
	}, [appSnap])
}

const transition = {
	color: css`
		transition: color 0.3s ease;
	`,
	background: css`
		transition: background-color 0.3s ease;
	`
}

export const colorStyles = {
	background: css`
		background-color: #fff;
		&.dark {
			background-color: #161616;
		}
		&.transition {
			${transition.background}
		}
	`,
	mainText: css`
		color: #000;
		&.dark {
			color: #fff;
		}
		&.transition {
			${transition.color}
		}
	`,
	textBefore: css`
		&::before {
			background-color: #000;
		}

		&.dark {
			&::before {
				background-color: #fff;
			}
		}
		&.transition {
			&::before {
				${transition.background}
			}
		}
	`,
	textAfter: css`
		&::after {
			background-color: #000;
		}

		&.dark {
			&::after {
				background-color: #fff;
			}
		}
		&.transition {
			&::after {
				${transition.background}
			}
		}
	`,
	textDivider: css`
		background-color: #000;
		&.dark {
			background-color: #fff;
		}
		&.transition {
			${transition.background}
		}
	`,
	appText: css`
		color: #fff;
	`,
	subText: css`
		color: #999;
	`,
	divider: css`
		background-color: #ccc;
	`
}
