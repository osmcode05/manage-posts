import { useContext, useState } from "react";
import { MyContext } from "../App";
import { Box, Typography, TextField, Button, Divider, Avatar, Stack, FormControl, InputLabel, Select, MenuItem, Container } from "@mui/material";
import { ArrowBack, CloudUpload, Save } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router";

const EditPost = () => {
  const { posts, setPosts, setAlertMessage } = useContext(MyContext);
  const navigate = useNavigate();
  const { EditId } = useParams();
  const post = posts.find((p) => p.id === parseInt(EditId));
  const [editPost, setEditPost] = useState({
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.author,
    dateOfcreate: post.dateOfcreate,
    category: post.category,
    avatar: post.avatar,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editPost.id) return;
    setPosts((prevPosts) => prevPosts.map((p) => (p.id === editPost.id ? editPost : p)));
    setAlertMessage("Post updated successfully!");
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{p: 4}}>
      <Button component={Link} to="/" variant="outlined" startIcon={<ArrowBack />} sx={{ mb: 3 }}>
        Back
      </Button>

      <Typography variant="h4" component="h1" fontWeight={700}>
        Edit Your Post
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField fullWidth name="title" value={editPost.title} onChange={handleChange} label="Title" required />

          <Stack direction="row" spacing={3} alignItems="center">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar src={editPost.avatar} sx={{ width: 80, height: 80, mb: 1.5, bgcolor: editPost.avatar ? "transparent" : "primary.light" }}>
                {editPost.avatar ? null : editPost.author?.charAt(0).toUpperCase() || "A"}
              </Avatar>
              <Button component="label" variant="outlined" startIcon={<CloudUpload />}>
                Upload
                <input type="file" hidden accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => setEditPost((prev) => ({ ...prev, avatar: event.target.result }));
                    reader.readAsDataURL(file);
                  }
                }} />
              </Button>
            </Box>

            <TextField fullWidth name="author" value={editPost.author} onChange={handleChange} label="Author Name" required />
          </Stack>

          <FormControl fullWidth>
            <InputLabel>Category *</InputLabel>
            <Select name="category" value={editPost.category} label="Category *" onChange={handleChange}>
              {["technology", "web-development", "architecture", "design", "database", "business"].map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField fullWidth multiline minRows={5} name="content" value={editPost.content} onChange={handleChange} label="Content *" required />
        </Stack>

        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" size="large" startIcon={<Save />}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditPost;