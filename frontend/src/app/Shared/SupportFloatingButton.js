"use client"
import React, { useState } from "react";
import { Button, Tooltip, Drawer, Box, Typography, IconButton, TextField, Snackbar, Alert } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";

const SupportFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbarOpen(true);
        setFormData({ fullName: "", email: "", message: "" });
        setIsOpen(false);
      } else {
        console.error("Failed to send message:", response.statusText);
        alert("Failed to send the message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message.");
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <Tooltip title="Need Help? Contact Support!" arrow>
        <Button
          variant="contained"
          style={{
            position: "fixed",
            bottom: 60,
            right: 16,
            background: "linear-gradient(45deg, #42a5f5, #478ed1)",
            color: "#fff",
            borderRadius: "50%",
            width: 64,
            height: 64,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.3s ease",
          }}
          onClick={() => setIsOpen(true)}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          <HelpOutlineIcon style={{ fontSize: "1.8rem" }} />
        </Button>
      </Tooltip>

      {/* Drawer for Form */}
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={{ width: 360, p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              borderBottom: "1px solid #e0e0e0",
              pb: 1,
            }}
          >
            <Typography variant="h6" component="div">
              Help & Support
            </Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={4}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Snackbar for Confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
          Thank you! Our team will contact you as soon as possible.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SupportFloatingButton;
