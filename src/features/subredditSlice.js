import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubreddits = createAsyncThunk('subreddits/fetchSubreddits', async () => {
  const { subreddit } = useParams(); 
  const response = await fetch(`https://www.reddit.com/${subreddit}.json`);
  const data = await response.json();
  return data.data.children.map(post => post.data);
});

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addSubreddit(state, action) {
      state.items.push(action.payload);
    },
    removeSubreddit(state, action) {
      state.items = state.items.filter(subreddit => subreddit.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addSubreddit, removeSubreddit } = subredditsSlice.actions;

export default subredditsSlice.reducer;