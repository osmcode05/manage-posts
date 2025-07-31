import { Alert, Snackbar } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import { MyContext } from "../App";

export default function AlertMsg() {
  const { posts, alertMessage } = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const prevPosts = useRef(posts);

  useEffect(() => {
    if (prevPosts.current !== posts) {
      setOpen(true);
      const timer = setTimeout(() => setOpen(false), 2000);
      return () => clearTimeout(timer);
    }
    prevPosts.current = posts;
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