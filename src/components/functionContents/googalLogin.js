import { setUser } from '../../redux/authSlice';

export const handleGoogleLogin = async (dispatch, showToast, navigate) => {
  try {
    showToast('Google login is no longer available. Please use email/password login.', 'info');
    // TODO: Implement OAuth with a third-party provider if needed
    // For now, users should use the email/password login flow
  } catch (err) {
    console.error('Google sign-in error', err);
    showToast(err.message || 'Google sign-in failed', 'error');
  }
};
