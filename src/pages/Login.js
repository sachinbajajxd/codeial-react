import { useState } from 'react';
import styles from '../styles/login.module.css';
import toast from 'react-hot-toast';
// import {login} from "../api";
import { useAuth } from '../hooks';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const auth=useAuth();
    const history=useNavigate();
    // console.log(auth);

    const handleSumbit = async (e) => {

        e.preventDefault();

        setLoggingIn(true);

        if(!email || !password){
            toast.error("This didn't work.")
        }

        const response = await auth.login(email, password);

        if(response.success){
            history('/');
            toast.success("Successfully Logged In")
        }else{
            toast.error(`${response.message}`)
        }
        setLoggingIn(false);
    }

    if(auth.user!=null){
        return <Navigate to='/' />
      }


    return <form className={styles.loginForm} onSubmit={handleSumbit}>
        <span className={styles.loginSignupHeader}>Login</span>

        <div className={styles.field}>
            <input type="email" placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={styles.field}>
            <input type="password" placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)}  />
        </div>

        <div className={styles.field}>
            <button disabled={loggingIn}>
              {loggingIn ? 'Logging in...' : 'Log In'}
            </button>
        </div>

    </form>
}

export default Login;