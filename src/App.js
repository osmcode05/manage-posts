import { useState, createContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router";
import PostsDashboard from "./Components/PostsDashboard";
import ViewPost from "./Components/ViewPost";
import CreatePost from "./Components/CreatePost";
import EditPost from "./Components/EditPost";
import NotFoundPage from "./Components/NotFoundPage";
import AlertMsg from "./Components/AlertMsg";
import { getAllPosts, saveAllPosts } from "./idbHelper";
import "@fontsource/inter";

export const MyContext = createContext();

const theme = createTheme({
  palette: {
    primary: { main: "#141414", light: "#616161", contrastText: "#fff" },
    secondary: { main: "#fff", contrastText: "#000" },
  },
  typography: { fontFamily: "Inter, Arial, sans-serif" },
});

export default function App() {
  const [posts, setPosts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isDBReady, setIsDBReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setPosts(await getAllPosts());
        setIsDBReady(true);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (isDBReady) {
      (async () => {
        try {
          await saveAllPosts(posts);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [posts, isDBReady]);

  return (
    <MyContext.Provider
      value={{ posts, setPosts, alertMessage, setAlertMessage, isDBReady }}
    >
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
