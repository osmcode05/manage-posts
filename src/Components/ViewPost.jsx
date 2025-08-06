import {
  Box, Typography, Chip, Avatar, Stack, Button, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import { CalendarToday, ArrowBack, Delete, Edit } from "@mui/icons-material";
import { useParams } from "react-router";
import { useState } from "react";
import { useAppContext } from "../Contexts/AppContext";

const ViewPost = () => {
  const { posts, setPosts, setAlertMessage, navigate } = useAppContext();
  const { ViewId } = useParams();
  const post = posts.find(p => p.id === parseInt(ViewId));
  const [open, setOpen] = useState(false);

  if (!post) return null;

  const handleDelete = () => {
    setPosts(posts.filter(p => p.id !== post.id));
    setAlertMessage("Post Deleted successfully!");
    setOpen(false);
    navigate("/");
  };

  return (
    <Box sx={{ mx: "auto", maxWidth: "md", p: 2 }}>
      
      <Stack direction="row">
        <Button onClick={()=>navigate(-1)} variant="outlined" startIcon={<ArrowBack />}>
          Back
        </Button>
        <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
          <Button onClick={() => navigate(`/edit-post/${post.id}`)} variant="outlined" startIcon={<Edit />}>
            Edit
          </Button>
          <Button onClick={() => setOpen(true) } variant="contained" color="error" startIcon={<Delete />}>
            Delete
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={2} my={4}>
        <Chip label={post.category} color="primary" sx={{ width: "fit-content", textTransform: "capitalize" }} />
        <Typography variant="h3" fontWeight={900} sx={{ textTransform: "capitalize" }}>
          {post.title}
        </Typography>
      </Stack>

      <Box border={1} borderColor="divider" borderRadius={1} p={3} mb={3}>
        <Stack direction="row" alignItems="center" pb={2} mb={2} borderBottom={1} borderColor="divider">
          <Avatar src={post.avatar}>
            {!post.avatar && post.author.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="subtitle1" color="primary.light" ml={2}>
            {post.author}
          </Typography>
          <Stack direction="row" ml="auto" spacing={1}>
            <CalendarToday fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {post.dateOfcreate}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {post.content}
        </Typography>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete the post.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  );
};

export default ViewPost;
