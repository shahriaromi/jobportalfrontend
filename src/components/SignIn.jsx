import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import axios from "axios";
import Header from "./Header";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://jobbackend-three.vercel.app/signin",
        {
          email,
          password,
        }
      );

      console.log("Success:", response.data);
      // Save the token in localStorage
      localStorage.setItem("authToken", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid email or password.");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      {" "}
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
              Sign In to Job Portal
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="16px"
              >
                <Typography variant="body2">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" variant="body1" underline="hover">
                    Sign Up
                  </Link>
                </Typography>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, py: 1 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </>
  );
}

export default SignIn;
