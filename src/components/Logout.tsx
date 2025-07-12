import { useEffect} from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase/firebase';
import styles from '../styles/auth-styles';

const Logout = () => {
  useEffect(() => {
    signOut(auth);
  }, []);

  return (
    <div style={styles.form}>Logout</div>
  )
}

export default Logout