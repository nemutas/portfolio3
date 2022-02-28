import { SkillDatas, WorkDatas } from './types';

export const localStorageKeys = {
	displayMode: 'display-mode'
}

export const effects = [
	'None',
	'Distortion',
	'RGB Shift',
	'Invert Color',
	'Ripple Distortion',
	'Volumetric Light',
	'Wave',
	'Ripple Mouse Moiton',
	'Pixel Mouse Motion'
] as const

export const years = ['2022', '2021'] as const

export const workDatas: WorkDatas = {
	2022: [
		{
			title: 'Unshift Works Clone',
			image: '/assets/images/2022/unshift_works_clone.png',
			app: 'https://nemutas.github.io/r3f-unshift-effect/'
		},
		{
			title: 'Elastic Cubes',
			image: '/assets/images/2022/elastic_cubes.png',
			app: 'https://nemutas.github.io/r3f-elastic-cubes/'
		},
		{
			title: 'Monopo Clone',
			image: '/assets/images/2022/monopo_clone.png',
			app: 'https://nemutas.github.io/r3f-monopo/'
		},
		{
			title: 'Vidro Universe',
			image: '/assets/images/2022/vidro_universe.png',
			app: 'https://nemutas.github.io/r3f-small-universe/'
		},
		{
			title: 'Swaying Grass',
			image: '/assets/images/2022/swaying_grass.png',
			app: 'https://nemutas.github.io/r3f-swaying-grass/'
		},
		{
			title: 'Terracotta Layers',
			image: '/assets/images/2022/terracotta_layers.png',
			app: 'https://nemutas.github.io/r3f-terracotta-layers/'
		},
		{
			title: 'Periodic Table',
			image: '/assets/images/2022/periodic_table.png',
			app: 'https://nemutas.github.io/r3f-periodic-table/'
		},
		{
			title: 'Gyogun',
			image: '/assets/images/2022/gyogun.png',
			app: 'https://nemutas.github.io/r3f-gyogun/'
		},
		{
			title: 'Works',
			image: '/assets/images/2022/works.png',
			app: 'https://r3f-works.vercel.app/'
		},
		{
			title: 'Radial Particles',
			image: '/assets/images/2022/radial_particles.png',
			app: 'https://nemutas.github.io/r3f-gpgpu-particles/'
		},
		{
			title: 'Icosahedron Screen',
			image: '/assets/images/2022/icosahedron_screen.png',
			app: 'https://nemutas.github.io/r3f-icosahedron-screen/'
		},
		{
			title: 'Homunculus Clone',
			image: '/assets/images/2022/homunculus.png',
			app: 'https://nemutas.github.io/r3f-homunculus/'
		}
	],
	2021: [
		{
			title: 'Zendo',
			image: '/assets/images/2021/zendo.png',
			app: 'https://nemutas.github.io/r3f-zendo/'
		},
		{
			title: '3D Audio Visualizer',
			image: '/assets/images/2021/3d_audio_visualizer.png',
			app: 'https://nemutas.github.io/r3f-audio-visualizer/'
		},
		{
			title: '3D Canvas Viewer',
			image: '/assets/images/2021/3d_canvas_viewer.png',
			app: 'https://nemutas.github.io/r3f-canvas-displacement/'
		},
		{
			title: 'God Rays',
			image: '/assets/images/2021/godrays.png',
			app: 'https://nemutas.github.io/r3f-godrays-effect/'
		},
		{
			title: 'Mediapipe Hands Demo',
			image: '/assets/images/2021/mediapipe_hands_demo.png',
			app: 'https://nemutas.github.io/app-mediapipe-hands-demo/'
		},
		{
			title: 'Mediapipe Facemesh Demo',
			image: '/assets/images/2021/mediapipe_facemesh_demo.png',
			app: 'https://nemutas.github.io/app-mediapipe-facemesh-demo/'
		},
		{
			title: 'Audio Visualizer',
			image: '/assets/images/2021/audio_visualizer.png',
			app: 'https://nemutas.github.io/app-audio-visualizer/'
		},
		{
			title: 'Portfolio2',
			image: '/assets/images/2021/portfolio2.png',
			app: 'https://portfolio2-nemutas.vercel.app/'
		},
		{
			title: 'Mixamo Animation',
			image: '/assets/images/2021/mixamo_animation.png',
			app: 'https://nemutas-mixamo-animation.web.app/'
		},
		{
			title: 'Legoman Designer',
			image: '/assets/images/2021/legoman_designer.png',
			app: 'https://nemutas.github.io/app-legoman-designer/'
		},
		{
			title: 'Earthquake Infomation',
			image: '/assets/images/2021/earthquake_info.png',
			app: 'https://nemutas.github.io/app-earthquake-info/'
		},
		{
			title: 'Handwritten Number',
			image: '/assets/images/2021/handwritten_number.png',
			app: 'https://nemutas.github.io/app-mnist/'
		}
	]
}

export const skillCategories = ['All', 'Active'] as const

export const skillDatas: SkillDatas = {
	language: [
		{ name: 'HTML5', iconName: 'html', experience: '1 year', isActive: true },
		{ name: 'CSS3', iconName: 'css', experience: '1 year', isActive: true },
		{ name: 'JavaScript', iconName: 'javascript', experience: '1 year', isActive: false },
		{ name: 'TypeScript', iconName: 'typescript', experience: '1 year', isActive: true },
		{ name: 'WebGL', iconName: 'webgl', experience: '6 months', isActive: true },
		{ name: 'Python', iconName: 'python', experience: '6 months', isActive: false },
		{ name: 'C#', iconName: 'c-sharp', experience: '4 years', isActive: false },
		{ name: 'Java', iconName: 'java', experience: '4 years', isActive: false }
	],
	framework: [
		{ name: 'React', iconName: 'react', experience: '1 year', isActive: true },
		{ name: 'Next.js', iconName: 'nextjs', experience: '1 year', isActive: true },
		{ name: 'Three.js', iconName: 'three', experience: '6 months', isActive: true },
		{ name: 'Node.js', iconName: 'nodejs', experience: '6 months', isActive: true },
		{ name: 'Express', iconName: 'express', experience: '6 months', isActive: true },
		{ name: '.NET Framework', iconName: 'dot-net', experience: '4 years', isActive: false },
		{ name: 'Keras', iconName: 'keras', experience: '6 months', isActive: false }
	],
	cloudService: [
		{ name: 'Firebase', iconName: 'firebase', experience: '1 year', isActive: true },
		{ name: 'AWS', iconName: 'aws', experience: '3 mounths', isActive: false },
		{ name: 'Heroku', iconName: 'heroku', experience: '3 mounths', isActive: true }
	],
	developmentTool: [
		{ name: 'VSCode', iconName: 'vscode', experience: '3 years', isActive: true },
		{ name: 'Visual Studio', iconName: 'visual-studio', experience: '4 years', isActive: false },
		{ name: 'GitHub', iconName: 'github', experience: '2 years', isActive: true },
		{ name: 'Qiita', iconName: 'qiita', experience: '2 years', isActive: true },
		{ name: 'Figma', iconName: 'figma', experience: '6 months', isActive: true },
		{ name: 'Blender', iconName: 'blender', experience: '6 months', isActive: true }
	]
}
