import styles from './Loader.module.scss';

export function Loader() {
  return (
    <div className={styles.spinner_container}>
      <img className={styles.spinner} src="/images/earth.png" alt="Loading" />
    </div>
  );
}
