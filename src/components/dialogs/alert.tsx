import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface TermAlertProps {
  open: boolean; // Controls whether the dialog is open
  title?: string; // Dialog title (optional)
  message: string; // Dialog message
  onConfirm?: () => void; // Callback for confirm action
  onCancel?: () => void; // Callback for cancel action
}

const TermAlert: React.FC<TermAlertProps> = ({
  open,
  title = "Alert", // Default title
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel} // Close the dialog when the backdrop is clicked
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {onCancel && (
          <Button onClick={onCancel} color="error" variant="outlined">
            Cancel
          </Button>
        )}
        {onConfirm && (
          <Button onClick={onConfirm} color="primary" variant="contained">
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TermAlert;
