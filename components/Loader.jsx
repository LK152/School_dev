import styles from '@styles/Loader.module.css';

const Loader = () => {
	return (
		<div className={styles.body}>
			<div className={styles.loader}>
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
};

export default Loader;
