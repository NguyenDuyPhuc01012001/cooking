import React, { Fragment } from 'react';
import styles from './on-developing.module.scss';
function OnDeveloping() {
	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.title}>Chức năng đang phát triển</div>
				<div className={styles.title}>Hãy quay lại sau nhé!</div>
				<button className={styles.mainButton}>
					<a href="/user">
						<div>Quay lại trang chủ</div>
					</a>
				</button>
			</div>
		</Fragment>
	);
}

export default OnDeveloping;
