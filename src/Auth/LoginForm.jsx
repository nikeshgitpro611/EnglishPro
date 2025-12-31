import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { supabase } from "../Supabase";

const LoginForm = ({ showToast, navigate, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const DEFAULT_PASSWORD = "123456";

    if (!email || !password) {
      showToast("Please fill all fields", "warning");
      return;
    }

    try {
      setLoading(true);

      // ✅ 1. Check if email exists in database
      const { data: users, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      if (queryError) throw queryError;

      if (!users || users.length === 0) {
        showToast("❌ Email not found in database", "error");
        return;
      }

      const user = users[0];
      console.log("User found:", user);

      // ✅ 2. Verify password is default "123456"
      if (password !== DEFAULT_PASSWORD) {
        showToast("❌ Invalid password. Default password is 123456", "error");
        return;
      }

      // ✅ 3. Store in Redux if credentials match
      dispatch(
        setUser({
          uid: user.id,
          email: user.email,
          name: user.name || "",
          role: user.role || "",
        })
      );

      showToast("✅ Signed in successfully", "success");
      setTimeout(() => navigate("/dashboard"), 700);
    } catch (err) {
      console.error("Login error:", err);
      showToast(err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
      <Typography variant="h5" textAlign="center" fontWeight={600}>
        Login to Your Account
      </Typography>

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
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        required
        disabled={loading}
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

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <Typography align="center">
        Don’t have an account?{" "}
        <Button onClick={onSwitchToSignup}>Sign Up</Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;
