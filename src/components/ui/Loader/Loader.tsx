import earthImg from '../../../assets/images/earth.png';
import styles from './Loader.module.scss';

export function Loader() {
  return (
    <div className={styles.spinner_container}>
      <img className={styles.spinner} src={earthImg} />
    </div>
  );
}
