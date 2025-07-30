import { Link } from "react-router";
import { useContext } from "react";
import { MyContext } from "../App";
import { AppBar, Avatar, Box, Button, Card, CardActions, CardContent, Chip, Container, Grid, Stack, Toolbar, Typography } from "@mui/material";
import { Add, CalendarToday, Edit, Visibility } from "@mui/icons-material";

// Function to get a preview of the post content
const getPreview = (text) =>
  text.length <= 120 ? text : `${text.substring(0, 120)}...`;

function PostsDashboard() {

  const { posts } = useContext(MyContext); // Accessing posts from context

  return (
    <Box>
      {/* AppBar with title and create post button */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "secondary.main", p: 2, mb: 2, boxShadow: 5 }} >
        <Toolbar sx={{ flexWrap: "wrap", gap: 2, }} >
          <Box>
            <Typography variant="h4" fontWeight={800} color="secondary.contrastText" >
              Posts Dashboard
            </Typography>
            <Typography color="primary.light"> Manage your posts efficiently </Typography>
          </Box>
          <Button sx={{ marginLeft: "auto" }} size="large"  variant="contained" component={Link} to="/create-post" startIcon={<Add />} >
            Create Post
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        {!posts?.length ? (
          // if there are no posts founds
          <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap: 3,bgcolor:"secondary.main",height:"300px"}}>
            <Typography variant="h4" fontWeight={800} color="primary.light">
              No posts found
            </Typography>
            <Typography variant="body1" color="primary.light">
              There are currently no posts to display.
            </Typography>
            <Button variant="contained" component={Link} to="/create-post" startIcon={<Add />} >
              Create Post
            </Button>
          </Box>
        ) : (
          // view Posts 
          <Grid container spacing={2} p={3}>
            {posts.map((post) => (
              <Grid item size={{ xs: 12, md: 6 }} key={post.id}>
                <Card sx={{height: "100%",display: "flex",flexDirection: "column",p: 2,boxShadow: 4}}>
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip label={post.category} color="primary" sx={{ mb: 2, textTransform: "capitalize" }} />
                    <Typography textTransform={"capitalize"} variant="h4" >
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph >
                      {getPreview(post.content)}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ px: 2 }}>
                    <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center" >
                      
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar src={post.avatar}>
                          {post.avatar ? post.avatar : post.author.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography style={{ textTransform: "capitalize" }} color="primary.light" variant="body2" >
                          {post.author}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center" color="text.secondary" >
                        <CalendarToday fontSize="small" />
                        <Typography variant="body2">
                          {post.dateOfcreate}
                        </Typography>
                      </Stack>

                    </Stack>
                  </CardActions>

                  <Stack direction="row" spacing={1} sx={{ pt: 2, borderTop: 1, borderColor: "divider" }} >
                    <Button component={Link} to={`/view-post/${post.id}`} color="secondary" variant="contained" startIcon={<Visibility />} fullWidth >
                      View
                    </Button>
                    <Button component={Link} to={`/edit-post/${post.id}`} color="secondary" variant="contained" startIcon={<Edit />} fullWidth >
                      Edit
                    </Button>
                  </Stack>

                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default PostsDashboard;
