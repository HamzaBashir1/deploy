import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import useFetchData from "@/app/hooks/useFetchData";

const Support = () => {
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch all support queries
  const { data: IssueData = [], loading, error } = useFetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/support`
  );

  // Sync fetched data to local state
  const [supportQueries, setSupportQueries] = useState(IssueData);

  useEffect(() => {
    if (IssueData && IssueData.length > 0) {
      setSupportQueries(IssueData);
    }
  }, [IssueData]);

  // Handle opening the modal
  const openModal = (query) => {
    setSelectedQuery(query);
    setModalIsOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedQuery(null);
  };

  // Handle status update
  const handleStatusUpdate = async (ticketNumber, status) => {
    try {
      const response = await axios.put(
        `/api/support/status/${ticketNumber}`,
        { status }
      );

      // Update local state after successful update
      setSupportQueries((prevQueries) =>
        prevQueries.map((query) =>
          query.ticketNumber === ticketNumber
            ? { ...query, status: response.data.updatedSupport.status }
            : query
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle delete support query
  const handleDelete = async (ticketNumber) => {
    try {
      await axios.delete(`/api/support/${ticketNumber}`);
      setSupportQueries((prevQueries) =>
        prevQueries.filter((query) => query.ticketNumber !== ticketNumber)
      );
    } catch (error) {
      console.error("Error deleting query:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Support Queries</h2>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Ticket #</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Message</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {supportQueries.map((query) => (
              <tr key={query.ticketNumber}>
                <td className="px-4 py-2 border-b">{query.ticketNumber}</td>
                <td className="px-4 py-2 border-b">{query.fullName}</td>
                <td className="px-4 py-2 border-b">{query.email}</td>
                <td className="px-4 py-2 border-b">{query.message}</td>
                <td className="px-4 py-2 border-b">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={query.status || "Pending"}
                      onChange={(e) =>
                        handleStatusUpdate(query.ticketNumber, e.target.value)
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Resolved">Resolved</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td className="px-4 py-2 border-b">
                  <Button
                    onClick={() => openModal(query)}
                    variant="contained"
                    color="primary"
                    className="mr-2"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleDelete(query.ticketNumber)}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for viewing the query details */}
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="ticket-details-modal"
        aria-describedby="view-ticket-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Ticket Details
          </Typography>
          {selectedQuery && (
            <div>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Ticket #:</strong> {selectedQuery.ticketNumber}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Name:</strong> {selectedQuery.fullName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {selectedQuery.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Message:</strong> {selectedQuery.message}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Status:</strong> {selectedQuery.status}
              </Typography>
            </div>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={closeModal}
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Support;
