import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
// import { Header } from "../App";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function AddJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/signin");
      return;
    }
  }, [navigate]);

  const generateUniqueId = () => {
    return `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jobData = {
      id: generateUniqueId(),
      title: jobTitle,
      description: jobDescription,
      location,
      salary,
    };

    console.log("Job Data:", jobData); // Log the payload
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("https://jobbackend-three.vercel.app/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      //show popup that job created successfully
      alert("Job created successfully");

      // navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Creating jobs failed. not authenticated");
    } finally {
      setJobTitle("");
      setJobDescription("");
      setLocation("");
      setSalary("");
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 16, mb: 16 }} maxWidth="sm">
        <Box
          component="form"
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Job
          </Typography>
          <TextField
            fullWidth
            label="Job Title"
            variant="outlined"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Job Description"
            variant="outlined"
            multiline
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Salary"
            variant="outlined"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default AddJob;
