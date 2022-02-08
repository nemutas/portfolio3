import React, { useEffect, useState, VFC } from 'react';
import { useSnapshot } from 'valtio';
import { css } from '@emotion/react';
import { workDatas } from '../../modules/datas';
import { workState } from '../../modules/store';
import { WorkDataDetail } from '../../modules/types';
import { Card } from './Card';

export const Collections: VFC = () => {
	const workSnap = useSnapshot(workState)
	const [works, setWorks] = useState<WorkDataDetail[]>([])

	useEffect(() => {
		setWorks(workDatas[workSnap.year])
	}, [workSnap.year])

	return (
		<div css={styles.container}>
			<div css={styles.cardContainer}>
				{works.map((work, i) => (
					<Card key={i} order={i + 1} data={work} />
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
	`,
	cardContainer: css`
		position: relative;
		width: 100%;
		height: 100%;
		padding-right: 30px;
		display: grid;
		grid-gap: 15px;
		grid-auto-rows: 300px;
		grid-template-columns: repeat(auto-fill, minmax(min(400px, 100vw), 1fr));
		overflow: auto;
	`
}
