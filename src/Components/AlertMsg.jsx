import { Alert, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppContext } from "../Contexts/AppContext";

export default function AlertMsg() {
  const { alertMessage } = useAppContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alertMessage !== "") { 
      setOpen(true);
      const timer = setTimeout(() => setOpen(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity="success" variant="filled" onClose={() => setOpen(false)}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}