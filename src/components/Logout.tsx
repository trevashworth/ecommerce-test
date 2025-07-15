import { useEffect} from 'react'
import { signOut } from 'firebase/auth';
import { userAuth } from '../lib/firebase/firebase';
import styles from '../styles/auth-styles';

const Logout = () => {
  useEffect(() => {
    signOut(userAuth);
  }, []);

  return (
    <div className={styles.form}>Logout</div>
  )
}

export default Logout