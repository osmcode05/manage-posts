import { Box, Typography, Chip, Avatar, Stack, Button } from "@mui/material";
import { CalendarToday, ArrowBack, Delete, Edit } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { useContext } from "react";
import { MyContext } from "../App";

const ViewPost = () => {
  const { posts, setPosts, setAlertMessage } = useContext(MyContext);
  const { ViewId } = useParams();
  const post = posts.find((p) => p.id === parseInt(ViewId));

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    setAlertMessage("Post deleted successfully!");
  };

  if (!post) return null;

  return (
    <Box sx={{ mx: "auto", maxWidth: "md", p: 2 }}>
      
      <Stack direction="row"><Button component={Link} to="/" variant="outlined" startIcon={<ArrowBack />} >
          Back
        </Button>
        <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
          <Button component={Link} to={`/edit-post/${post.id}`} variant="outlined" startIcon={<Edit />} >
            Edit
          </Button>
          <Button component={Link} to="/" onClick={() => handleDelete(post.id)} variant="contained" color="error" startIcon={<Delete />} >
            Delete
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={2} mb={4} mt={4}>
        <Chip label={post.category} color="primary" sx={{ width: "fit-content", textTransform: "capitalize", }} />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 900, textTransform: "capitalize" }} >
          {post.title}
        </Typography>
      </Stack>

      <Box border={1} borderColor="divider" borderRadius={1} p={3} mb={3}>
        <Stack direction="row" alignItems="center" pb={2} mb={2} borderBottom={1} borderColor="divider">
          <Avatar src={post.avatar}>
            {post.avatar ? "" : post.author.charAt(0).toUpperCase()}
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
      
    </Box>
  );
};

export default ViewPost;
