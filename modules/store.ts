import { proxy } from 'valtio';
import { ApplicationState, DisplayMode, EffectList, SkillCategories, Years } from './types';

export const effectState = proxy<{ currentName: EffectList }>({ currentName: 'None' })

export const workState = proxy<{ year: Years }>({ year: '2022' })

export const skillState = proxy<{ category: SkillCategories }>({ category: 'Active' })

export const appState = proxy<ApplicationState>({
	displayMode: 'dark',
	transition: false,
	defaultLoaded: false,
	endLoading: false
})
