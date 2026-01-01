import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock, Email } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { userApi } from '../utils/dbApi';
// import bcrypt from "bcryptjs";


const Signup = ({ showToast, navigate, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const dispatch = useDispatch();
//   const passwordHash = bcrypt.hashSync(formData.password, 10);

  const roles = ['Admin', 'Manager', 'User', 'Developer', 'Tester'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, email, password, role } = formData;

  if (!name || !email || !password || !role) {
    showToast('Please fill all fields', 'warning');
    return;
  }

  if (password.length < 6) {
    showToast('Password must be at least 6 characters', 'warning');
    return;
  }

  try {
    setLoading(true);

    // ✅ 1. Create user in JSON Server
    const response = await userApi.create({
      name,
      email,
      password, // In production, this should be hashed
      role,
      created_at: new Date().toISOString(),
    });

    const user = response.data;

    if (!user) {
      throw new Error('Failed to create user');
    }

    // ✅ 2. Auto-login user
    dispatch(
      setUser({
        uid: user.id,
        email: user.email,
        name,
        role,
      })
    );

    showToast('Account created successfully!', 'success');
    navigate('/dashboard');

  } catch (err) {
    console.error('Signup error:', err);
    showToast(err.message || 'Signup failed', 'error');
  } finally {
    setLoading(false);
  }
};

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Typography variant="h5" textAlign="center" fontWeight={600}>
        Create Account
      </Typography>

      <TextField
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        required
        disabled={loading}
        helperText="Minimum 6 characters"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        disabled={loading}
      >
        {roles.map((r) => (
          <MenuItem key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Creating Account...' : 'Sign Up'}
      </Button>

      <Typography align="center">
        Already have an account?{' '}
        <Button onClick={onSwitchToLogin} disabled={loading}>
          Login
        </Button>
      </Typography>
    </Box>
  );
};

export default Signup;
