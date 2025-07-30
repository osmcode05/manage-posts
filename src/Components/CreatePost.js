import { useContext, useState } from "react";
import { MyContext } from "../App";
import { Box, Typography, TextField, Button, Divider, Avatar, Stack, FormControl, InputLabel, Select, MenuItem, Container } from "@mui/material";
import { ArrowBack, CloudUpload, Save } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";

const CreatePost = () => {
  const { posts, setPosts, setAlertMessage } = useContext(MyContext);
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState({
    id: Math.max(0, ...posts.map((post) => post.id)) + 1,
    title: "",
    content: "",
    author: "",
    dateOfcreate: new Date().toISOString().split("T")[0],
    category: "Unknown",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => setNewPost(prev => ({ ...prev, avatar: event.target.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    setPosts(prev => [...prev, newPost]);
    setAlertMessage("Post added successfully!");
  };

  return (
    <Container maxWidth="sm" sx={{p: 4}}>
      <Button component={Link} to="/" variant="outlined" startIcon={<ArrowBack />}>
        Back
      </Button>

      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mt: 2 }}>
        Create Your Post
      </Typography>
      
      <Divider sx={{ my: 2 }} />

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField fullWidth name="title" value={newPost.title} onChange={handleChange} label="Title" required />

          <Stack direction="row" spacing={3} alignItems="center">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar src={newPost.avatar} sx={{ 
                width: 80, 
                height: 80, 
                mb: 1.5, 
                bgcolor: newPost.avatar ? "transparent" : "primary.light" 
              }}>
                {newPost.avatar ? "" : newPost.author?.charAt(0).toUpperCase() || "A"}
              </Avatar>
              <Button component="label" variant="outlined" startIcon={<CloudUpload />}>
                Upload
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
            </Box>

            <TextField fullWidth name="author" value={newPost.author} onChange={handleChange} label="Author Name" required />
          </Stack>

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select name="category" value={newPost.category} label="Category" onChange={handleChange}>
              {["technology", "web-development", "architecture", "design", "database", "business"].map(cat =>
                (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))
              }
            </Select>
          </FormControl>

          <TextField fullWidth multiline minRows={5} name="content" value={newPost.content} 
            onChange={handleChange} label="Content *" required />
        </Stack>

        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" size="large" startIcon={<Save />}>
            Publish Post
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreatePost;