import React from "react";
import { Box, Button, Divider, Modal } from "@mui/material";
import "./ModalDelete.css";

function ModalDelete({ modalOpen, handleCloseModal, handleDelete }) {
  return (
    <div className="modal-delete">
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="modal-delete__description">
            <h2>Delete Article</h2>
            <p>Are you sure you want to delete this article?</p>
          </div>
          <Divider />
          <div className="modal-delete__action">
            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{
                bgcolor: "#a3b3cc",
                color: "black",
                textTransform: "none",
                marginRight: "1em",
                "&:hover": {
                  bgcolor: "#91a3bf",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete();
                handleCloseModal();
              }}
              variant="contained"
              color="error"
              sx={{ color: "black", textTransform: "none" }}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalDelete;
