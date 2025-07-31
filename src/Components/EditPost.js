import { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowBack, CloudUpload, Save } from "@mui/icons-material";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Avatar,
  Stack,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const CATEGORIES = ["Public","Business","Technology","Web Development","Design","Programmin"];
const MAX_IMAGE_SIZE = 2; // MB

const EditPost = () => {
  const { posts, setPosts, setAlertMessage } = useContext(MyContext);
  const navigate = useNavigate();
  const { EditId } = useParams();
  const [post, setPost] = useState(null);
  const [imageStatus, setImageStatus] = useState({ error: "", info: "" });

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === parseInt(EditId));
    setPost(foundPost ? { ...foundPost } : null);
  }, [posts, EditId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((p) => ({ ...p, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_IMAGE_SIZE) {
      setImageStatus({
        error: `Max ${MAX_IMAGE_SIZE}MB (${sizeMB.toFixed(2)}MB)`,
        info: "",
      });
      setPost((p) => ({ ...p, avatar: "" }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setPost((p) => ({ ...p, avatar: result }));
        setImageStatus({ error: "", info: `${sizeMB.toFixed(2)}MB` });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageStatus.error || !post) return;

    const updatedPosts = posts.map((p) => (p.id === post.id ? post : p));
    setPosts(updatedPosts);
    setAlertMessage("Post updated successfully!");
    navigate(-1);
  };

  if (!post) {
    return (
      <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",height: "100vh"}}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>

      <Button variant="outlined" component={Link} to="/" startIcon={<ArrowBack />} sx={{ mb: 3 }} >
        Back
      </Button>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        Edit Post
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
                sx={{ width: 100, height: 100,fontSize: 40,bgcolor: post.avatar ? 'transparent' : 'primary.light'}}
              >
                {!post.avatar && (post.author?.charAt(0).toUpperCase() || "A")}
              </Avatar>

              <Button component="label" variant="outlined" size="small" startIcon={<CloudUpload />} fullWidth sx={{ mt: 1 }} >
                Upload
                <input type="file" hidden accept="image/*" onChange={handleImage} />
              </Button>

              <Typography
                variant="caption"
                color={imageStatus.error ? "error" : "primary.light"}
                sx={{ textAlign: 'center' }}
              >
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

        <Button type="submit" variant="contained" startIcon={<Save />} disabled={!!imageStatus.error} fullWidth >
          Update Post
        </Button>
      </Box>
    </Box>
  );
};

export default EditPost;