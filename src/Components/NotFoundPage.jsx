import { Box, Button, Typography, Container } from "@mui/material";
import { Home, SentimentVeryDissatisfied } from "@mui/icons-material";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <Box textAlign="center" sx={{ width: "100%", py: 8 }}>
        <SentimentVeryDissatisfied sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
        
        <Typography variant="h1" sx={{ fontWeight: 700, fontSize: "4rem", mb: 2 }}>
          404
        </Typography>
        
        <Typography variant="h4" sx={{ mb: 2 }}>
          Oops! Page Not Found
        </Typography>
        
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<Home />}
          sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: "none", fontSize: "1rem", }} >
          Return to Homepage
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundPage;