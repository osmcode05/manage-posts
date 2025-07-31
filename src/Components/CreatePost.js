import { useContext, useState } from "react";
import { MyContext } from "../App";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Avatar,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ArrowBack, CloudUpload, Save } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";

const CATEGORIES = ["Public","Business","Technology","Web Development","Design","Programmin"];
const MAX_IMAGE_SIZE = 2; // MB

const CreatePost = () => {
  const { posts, setPosts, setAlertMessage } = useContext(MyContext);
  const navigate = useNavigate();
  const [imageStatus, setImageStatus] = useState({ error: "", info: "" });
  const [post, setPost] = useState({
    id: Math.max(0, ...posts.map((p) => p.id)) + 1,
    title: "",
    content: "",
    author: "",
    dateOfcreate: new Date().toISOString().split("T")[0],
    category: "",
    avatar: "",
  });

  const handleChange = (e) =>
    setPost((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_IMAGE_SIZE) {
      setImageStatus({
        error: `Max ${MAX_IMAGE_SIZE}MB (your file: ${sizeMB.toFixed(2)}MB)`,
        info: "",
      });
      setPost((p) => ({ ...p, avatar: "" }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPost((p) => ({ ...p, avatar: e.target.result }));
      setImageStatus({ error: "", info: `Size: ${sizeMB.toFixed(2)}MB` });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageStatus.error) return;
    setPosts((p) => [...p, post]);
    setAlertMessage("Post published successfully!");
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Button variant="outlined" component={Link} to="/" startIcon={<ArrowBack />} sx={{ mb: 3 }}>
        Back
      </Button>

      <Typography fontWeight={700} variant="h4" gutterBottom>
        Create New Post
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={4}>

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            variant="outlined"
            size="medium"
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
            <Stack spacing={1} sx={{ alignItems: "center", minWidth: 120 }}>
              <Avatar 
                src={post.avatar} 
                sx={{ width: 100, height: 100,fontSize: 40,bgcolor: post.avatar ? 'transparent' : 'primary.light'}}>
                {post.avatar ? "" : post.author?.charAt(0).toUpperCase() || "A"}
              </Avatar>
              <Button component="label" variant="outlined" size="small" startIcon={<CloudUpload />} fullWidth sx={{ mt: 1 }} >
                Upload
                <input type="file" hidden accept="image/*" onChange={handleImage} />
              </Button>

              <Typography variant="caption" color={imageStatus.error ? "error" : "text.secondary"} sx={{ textAlign: 'center' }} >
                {imageStatus.error || imageStatus.info || `Max ${MAX_IMAGE_SIZE}MB`}
              </Typography>
            </Stack>

            <Stack spacing={3} sx={{ flexGrow: 1, width: '100%' }}>

              <TextField
                fullWidth
                label="Author"
                name="author"
                value={post.author}
                onChange={handleChange}
                required
                variant="outlined"
              />

              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category *</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  label="Category"
                  name="category"
                  value={post.category}
                  onChange={handleChange}
                  required
                  variant="outlined"
                >
                  {CATEGORIES.map((cat) => (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))}
                </Select>
              </FormControl>

            </Stack>
          </Stack>

          <TextField
            multiline
            minRows={6}
            label="Content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />

        </Stack>

        <Divider sx={{ my: 4 }} />
        <Button
          type="submit"
          variant="contained"
          startIcon={<Save />}
          disabled={imageStatus.error}
          fullWidth
          size="large"
          sx={{ py: 1.5 }}
        >
          Publish Post
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePost;