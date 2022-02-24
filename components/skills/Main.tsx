import Image from 'next/image';
import React, { useRef, VFC } from 'react';
import { css } from '@emotion/react';
import { colorTheme, skillDatas } from '../../modules/datas';
import { SkillData } from '../../modules/types';
import { Card } from './Card';

export const Main: VFC = () => {
	return (
		<div css={styles.container}>
			<SkillGroup header="Programming Language" datas={skillDatas.language} />
			<SkillGroup header="Framework" datas={skillDatas.framework} />
			<SkillGroup header="Cloud Service" datas={skillDatas.cloudService} />
			<SkillGroup header="Development Tool" datas={skillDatas.developmentTool} />
		</div>
	)
}

type SkillGroupProps = {
	header: string
	datas: SkillData[]
}

const SkillGroup: VFC<SkillGroupProps> = ({ header, datas }) => {
	return (
		<div css={styles.skillGroup}>
			<div css={styles.header}>{header}</div>
			<div css={styles.cardContainer}>
				{datas.map((data, i) => (
					<Card key={i} data={data} />
				))}
			</div>
		</div>
	)
}

// ========================================================
// styles

const styles = {
	container: css`
		position: relative;
		width: 100%;
		height: 100%;
		padding: 20px 30px;
		padding-right: 0;
		overflow: auto;
	`,
	header: css`
		margin-bottom: 10px;
		font-size: 3.5rem;
		color: ${colorTheme.light.mainText};
	`,
	skillGroup: css`
		margin-bottom: 40px;
	`,
	cardContainer: css`
		display: flex;
		flex-wrap: wrap;
		grid-gap: 15px;
	`
}
