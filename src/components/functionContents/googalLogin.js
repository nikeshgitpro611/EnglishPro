import { signInWithPopup } from 'firebase/auth';
import { setUser } from '../../redux/authSlice';


export const handleGoogleLogin = async (auth, googleProvider, dispatch, showToast, navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    dispatch(
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
      })
    );
    
    showToast('Signed in with Google', 'success');
    setTimeout(() => navigate('/dashboard'), 700);
  } catch (err) {
    console.error('Google sign-in error', err);
    showToast(err.message || 'Google sign-in failed', 'error');
  }
};
