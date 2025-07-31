import { Add } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "secondary.main", p: 2, mb: 2, boxShadow: 5 }}
    >
      <Toolbar sx={{ flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            color="secondary.contrastText"
          >
            Posts Dashboard
          </Typography>
          <Typography color="primary.light">
            {" "}
            Manage your posts efficiently{" "}
          </Typography>
        </Box>
        <Button
          sx={{ marginLeft: "auto" }}
          size="large"
          variant="contained"
          component={Link}
          to="/create-post"
          startIcon={<Add />}
        >
          Create Post
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
