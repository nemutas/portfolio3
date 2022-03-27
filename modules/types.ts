import { effects, skillCategories, years } from './datas';

export type EffectList = typeof effects[number]

export type Years = typeof years[number]

export type WorkDatas = {
	[key: number]: WorkDataDetail[]
}

export type WorkDataDetail = {
	title: string
	image: string
	app: string
}

export type SkillCategories = typeof skillCategories[number]

export type SkillData = {
	name: string
	iconName: string
	experience: string
	isActive: boolean
}

export type SkillDatas = {
	language: SkillData[]
	framework: SkillData[]
	cloudService: SkillData[]
	developmentTool: SkillData[]
}

export type DisplayMode = 'light' | 'dark'

export type ApplicationState = {
	displayMode: DisplayMode
	transition: boolean
	defaultLoaded: boolean
	endLoading: boolean
}
