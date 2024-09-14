import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Grid,
  Container,
  InputAdornment,
} from "@mui/material";
import { Lock, Email } from "@mui/icons-material";
import Header from "./Header";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: true,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setForm({ ...form, termsAccepted: e.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    setError("");

    //if not checked
    if (!form.termsAccepted) {
      setError("Please accept the terms and privacy policy");
      return;
    }

    try {
      const response = await axios.post(
        "https://jobbackend-three.vercel.app/signup",
        {
          email: form.email,
          password: form.password,
        }
      );

      console.log("Success:", response.data);
      alert("Signup successful. Please sign in to continue.");
      // Navigate to the desired route after successful signup
    } catch (error) {
      console.error("Error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setForm({
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: true,
      });
    }
  };

  return (
    <>
      <Header></Header>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "2rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Create an Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoFocus
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                required
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    name="termsAccepted"
                    checked={form.termsAccepted}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label="I agree to the Terms and Privacy Policy"
                sx={{ mt: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, py: 1 }}
              >
                Sign Up
              </Button>
              <Typography align="center" variant="body1" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link to="/signin" variant="body1" underline="hover">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Grid>
    </>
  );
};

export default SignUp;
