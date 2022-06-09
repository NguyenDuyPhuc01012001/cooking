import React from 'react';
import { Fragment } from 'react';
import styles from './not-found-admin.module.scss';
function NotFoundAdmin() {
	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.title}>Rất tiếc!</div>
				<div className={styles.title}>Trang này không tồn tại</div>
				<button className={styles.mainButton}>
					<a href="/user">Quay lại trang chủ</a>
				</button>
			</div>
		</Fragment>
	);
}

export default NotFoundAdmin;
