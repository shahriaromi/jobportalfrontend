import React, { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Joblist({ jobs, setJobs }) {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`https://jobbackend-three.vercel.app/jobs/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Container sx={{ mt: 16, mb: 16 }}>
      <Grid container spacing={4}>
        {jobs.map((job) => (
          <Grid item key={job.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <WorkIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h5" component="div" fontWeight="bold">
                    {job.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {truncateText(job.description, 20)}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationOnIcon color="secondary" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <AttachMoneyIcon color="success" sx={{ mr: 1 }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    Salary: ${job.salary}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="text"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpen(job)}
                  >
                    View
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(job.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 4,
            backgroundColor: "white",
            margin: "auto",
            mt: 10,
            maxWidth: 500,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {selectedJob && (
            <>
              <Typography variant="h4" component="div" fontWeight="bold" mb={2}>
                {selectedJob.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={2}>
                {selectedJob.description}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={2}>
                Location: {selectedJob.location}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight="bold"
              >
                Salary: ${selectedJob.salary}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default Joblist;
