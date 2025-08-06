import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router";
import PostsDashboard from "./Components/PostsDashboard";
import ViewPost from "./Components/ViewPost";
import ManagePosts from "./Components/ManagePosts";
import NotFoundPage from "./Components/NotFoundPage";
import AlertMsg from "./Components/AlertMsg";
import AppContextsProvider from "./Contexts/AppContext";
import "@fontsource/inter";

const theme = createTheme({
  palette: {
    primary: { main: "#141414", light: "#616161", contrastText: "#fff" },
    secondary: { main: "#fff", contrastText: "#000" },
  },
  typography: { fontFamily: "Inter, Arial, sans-serif" },
});

export default function App() {
  return (
    <AppContextsProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<PostsDashboard />} />
          <Route path="/view-post/:ViewId" element={<ViewPost />} />
          <Route path="/create-post" element={<ManagePosts mood="create" />} />
          <Route path="/edit-post/:EditId" element={<ManagePosts mood="edit" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <AlertMsg />
      </ThemeProvider>
    </AppContextsProvider>
  );
}
