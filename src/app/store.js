// store.js
import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './features/comments/commentsSlice';
import postsReducer from './features/posts/postsSlice';
import subredditsReducer from './features/subreddits/subredditsSlice';

const store = configureStore({
  reducer: {
    subreddits: subredditsReducer
  },
});

export default store;
