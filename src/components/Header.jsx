import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("authToken");
    setIsAuthenticated(!!user);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(to right, #4b6cb7, #182848)",
        height: "64px",
      }}
    >
      <Container>
        <Toolbar>
          {/* Left side: Job Portal (Logo) */}
          <Typography
            variant="h6"
            color="inherit"
            underline="none"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Job Portal
          </Typography>

          {/* Right side: Menu Items */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Button color="inherit" onClick={() => navigate("/")}>
                  Joblist
                </Button>
                <Button color="inherit" onClick={() => navigate("/addjob")}>
                  Add Job
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    navigate("/signin");
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
                <Button color="inherit" onClick={() => navigate("/signin")}>
                  Sign In
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
