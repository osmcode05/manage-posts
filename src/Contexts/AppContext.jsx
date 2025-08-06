import { getAllPosts, saveAllPosts } from "../db/idbHelper";
import { useState, createContext, useEffect, useContext } from "react";
import { useNavigate } from "react-router";


const AppContext = createContext();

export default function AppContextsProvider({ children }) {
  const navigate = useNavigate();
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
    <AppContext.Provider
      value={{
        posts,
        setPosts,
        alertMessage,
        setAlertMessage,
        isDBReady,
        navigate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
    return useContext(AppContext);
}