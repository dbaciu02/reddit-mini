import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ROUTES from './routes';  
import AppLayout from '../app/AppLayout.js';
import AllSubreddits from "../components/allSubReddits.js";
import Subreddit from "../components/subReddit.js";
import Post from "../components/post.js";
import Search from "../components/search.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<AppLayout />}>
          <Route path={ROUTES.allSubredditRoute()} element={<AllSubreddits />} />
          <Route path={ROUTES.subredditRoute(':subreddit')} element={<Subreddit />}  />
          <Route path={ROUTES.postRoute(':subreddit', ':postId', ':postTitle')} element={<Post />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
