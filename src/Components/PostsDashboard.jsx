import { useAppContext } from "../Contexts/AppContext";
import {
  Avatar, Box, Button, Card, CardActions, CardContent, Chip,
  Container, Grid, Stack, Typography, CircularProgress,
} from "@mui/material";
import { Add, CalendarToday, Edit, Visibility } from "@mui/icons-material";
import NavBar from "./NavBar";

const getPreview = (text) => text.length <= 120 ? text : `${text.slice(0, 120)}...`;

const EmptyState = ({ navigate }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
      bgcolor: "secondary.main",
      height: 300,
    }}
  >
    <Typography variant="h4" fontWeight={800} color="primary.light">
      There are no posts
    </Typography>
    <Typography color="primary.light">
      Start by creating your first post.
    </Typography>
    <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/create-post")} >
      Create Post
    </Button>
  </Box>
);

const LoadingState = () => (
  <Box sx={{display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "center", height: 400}} >
    <CircularProgress size={50} />
    <Typography mt={2} color="text.secondary">Loading posts...</Typography>
  </Box>
);

const PostCard = ({ post, navigate }) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column", p: 2, boxShadow: 4, }} >
        <CardContent sx={{ flexGrow: 1 }}>
          <Chip
            label={post.category}
            color="primary"
            sx={{ mb: 2, textTransform: "capitalize" }}
          />
          <Typography variant="h4" textTransform="capitalize" fontWeight="bold">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {getPreview(post.content)}
          </Typography>
        </CardContent>

        <CardActions sx={{ px: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" >
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar src={post.avatar}>
                {post.avatar || post.author?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" color="primary.light" textTransform="capitalize">
                {post.author}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" color="text.secondary" >
              <CalendarToday fontSize="small" />
              <Typography variant="body2">{post.dateOfcreate}</Typography>
            </Stack>
          </Stack>
        </CardActions>

        <Stack direction="row" spacing={1} sx={{ pt: 2, borderTop: 1, borderColor: "divider" }} >

          <Button
            onClick={() => navigate(`/view-post/${post.id}`) }
            color="secondary"
            variant="contained"
            startIcon={<Visibility />}
            fullWidth
          >
            View
          </Button>

          <Button
            onClick={() => navigate(`/edit-post/${post.id}`)}
            color="secondary"
            variant="contained"
            startIcon={<Edit />}
            fullWidth
          >
            Edit
          </Button>

        </Stack>
      </Card>
    </Grid>
  );
};

export default function PostsDashboard() {
  const { posts, isDBReady, navigate } = useAppContext();
  return (
    <Box>
      <NavBar />
      <Container>
        {!isDBReady ? <LoadingState /> :
          posts.length === 0 ? <EmptyState navigate={navigate} /> :
            <Grid container spacing={2} p={3}>
              {posts.map(post => <PostCard key={post.id} navigate={navigate} post={post} />)}
            </Grid>}
      </Container>
    </Box>
  );
}
