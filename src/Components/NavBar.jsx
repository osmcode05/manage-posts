import { Add } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../App";

const NavBar = () => {
  const { navigate } = useContext(MyContext);
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "secondary.main", p: 2, mb: 2, boxShadow: 5 }} >
      <Toolbar sx={{ flexWrap: "wrap", gap: 2 }}>
        <Box>

          <Typography variant="h4" fontWeight={900} color="secondary.contrastText" >
            Posts Dashboard
          </Typography>

          <Typography color="primary.light">
            Manage your posts efficiently
          </Typography>

        </Box>

        <Button
          sx={{ marginLeft: "auto" }}
          size="large"
          variant="contained"
          onClick={() => navigate("/create-post")}
          startIcon={<Add />}
        >
          Create Post
        </Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
