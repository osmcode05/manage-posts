import { useState, createContext, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router";
import PostsDashboard from "./Components/PostsDashboard";
import ViewPost from "./Components/ViewPost";
import CreatePost from "./Components/CreatePost";
import EditPost from "./Components/EditPost";
import NotFoundPage from "./Components/NotFoundPage";
import AlertMsg from "./Components/AlertMsg";
import "@fontsource/inter";

export const MyContext = createContext();

const theme = createTheme({
  palette: {
    primary: { main: "#141414", light: "#616161", contrastText: "#fff" },
    secondary: { main: "#ffffff", contrastText: "#000" },
  },
  typography: {fontFamily: "Inter, Arial, sans-serif"}
});

function App() {
  const [alertMessage, setAlertMessage] = useState("");
  const [posts, setPosts] = useState( JSON.parse(localStorage.getItem("UserPosts")) || [] );
  useEffect(() => localStorage.setItem("UserPosts", JSON.stringify(posts)), [posts]);

  return (
    <MyContext.Provider value={{ posts, setPosts, alertMessage, setAlertMessage }}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<PostsDashboard />} />
          <Route path="/view-post/:ViewId" element={<ViewPost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:EditId" element={<EditPost />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <AlertMsg />
      </ThemeProvider>
    </MyContext.Provider>
  );
}

export default App;
