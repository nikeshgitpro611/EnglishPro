
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import { auth, googleProvider } from '../../Auth/auth';
import { useDispatch } from 'react-redux';
import { handleGoogleLogin } from '../functionContents/googalLogin';
import LoginForm from '../../Auth/LoginForm';
import Signup from '../../Auth/SignUp';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  const showToast = (message, severity = 'info') => setToast({ open: true, message, severity });
  
  const handleCloseToast = (_, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 900, px: 3 }}>
        <Paper
          elevation={20}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Grid container>
            {/* Left: Google Login */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                p: { xs: 4, md: 6 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f9f9f9',
              }}
            >
              <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: '#333' }}>
                Login with Google
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => handleGoogleLogin(auth, googleProvider, dispatch, showToast, navigate)}
                startIcon={
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    width={24}
                    height={24}
                  />
                }
                sx={{
                  px: 6,
                  py: 1.5,
                  bgcolor: '#fff',
                  color: '#333',
                  border: '1px solid #ddd',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#f8f8f8', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
                }}
              >
                Sign in with Google
              </Button>
            </Grid>

            <Grid item xs={12} md="auto">
              <Divider
                orientation={isMobile ? 'horizontal' : 'vertical'}
                flexItem
                sx={{
                  borderColor: '#ccc',
                  my: isMobile ? 3 : 0,
                  mx: isMobile ? 4 : 0,
                }}
              />
            </Grid>

            {/* Right: Email/Password Login or Signup */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                p: { xs: 4, md: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {isSignup ? (
                <Signup
                  showToast={showToast}
                  navigate={navigate}
                  onSwitchToLogin={() => setIsSignup(false)}
                />
              ) : (
                <LoginForm
                  showToast={showToast}
                  navigate={navigate}
                  onSwitchToSignup={() => setIsSignup(true)}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
