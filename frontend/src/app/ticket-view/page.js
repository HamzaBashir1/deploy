"use client";
import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Modal,
  Button,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import { AuthContext } from "../context/AuthContext";
import useFetchData from "../hooks/useFetchData";
import { format } from "date-fns";

const Page = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { data: IssueData = [], loading, error } = useFetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/support/issues?email=${email}`
  );

  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleOpen = (issue) => setSelectedIssue(issue);
  const handleClose = () => setSelectedIssue(null);

  return (
    <>
      <Header />
      <Box sx={{ px: 4, py: 6, minHeight: "100vh" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            textAlign: "center",
            fontWeight: "bold",
            mx: "auto",
            maxWidth: 600,
          }}
        >
          My Support Tickets
        </Typography>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 4, mx: "auto", maxWidth: 600 }}>
            {typeof error === "string"
              ? error
              : "An error occurred while fetching support tickets."}
          </Alert>
        )}

        {/* No Tickets */}
        {!loading && !error && IssueData.length === 0 && (
          <Alert severity="info" sx={{ mb: 4, mx: "auto", maxWidth: 600 }}>
            You have no support tickets at the moment.
          </Alert>
        )}

        {/* Tickets Grid */}
        {!loading && !error && IssueData.length > 0 && (
          <Grid container spacing={3} sx={{ mx: "auto", maxWidth: 1200 }}>
            {IssueData.map((issue) => (
              <Grid item xs={12} sm={6} md={4} key={issue._id}>
                <Card
                  elevation={5}
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    background:
                      "linear-gradient(to bottom, #f4f4f4, #ffffff), linear-gradient(to top, #00c6ff, #0072ff)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "content-box, border-box",
                    transition: "all 0.3s ease",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.15)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {/* Status Label */}
                  <Chip
                    label={issue.status || "Pending"}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      fontWeight: "bold",
                      zIndex: 1,
                      color: "white",
                      bgcolor:
                        issue.status === "Resolved"
                          ? "green"
                          : issue.status === "In Progress"
                          ? "orange"
                          : "red", // Pending status is now red
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor:
                          issue.status === "Resolved"
                            ? "#388e3c"
                            : issue.status === "In Progress"
                            ? "#f57c00"
                            : "#d32f2f",
                      },
                    }}
                  />
                  <CardActionArea onClick={() => handleOpen(issue)}>
                    <CardContent
                      sx={{
                        p: 3,
                        textAlign: "center",
                        "& > *": {
                          mb: 1,
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
                      >
                        {issue.message}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Ticket Number: {issue.ticketNumber}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Submitted by: {issue.fullName}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Date: {format(new Date(issue.date), "MMM dd, yyyy hh:mm a")}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Modal for Ticket Details */}
        {selectedIssue && (
          <Modal open={!!selectedIssue} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                maxWidth: 500,
                bgcolor: "background.paper",
                borderRadius: 5,
                boxShadow: 24,
                p: 4,
                outline: "none",
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
              >
                Ticket Details
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Message:</strong> {selectedIssue.message}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Ticket Number:</strong> {selectedIssue.ticketNumber}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Submitted by:</strong> {selectedIssue.fullName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Date:</strong>{" "}
                {format(new Date(selectedIssue.date), "MMM dd, yyyy hh:mm a")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Status:</strong> {selectedIssue.status || "Pending"}
              </Typography>
              <Box sx={{ mt: 4, textAlign: "right" }}>
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Page;
