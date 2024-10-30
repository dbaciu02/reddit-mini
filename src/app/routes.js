const ROUTES = {
    allSubredditRoute: () => "/subreddit/all",
    subredditRoute: (subreddit) => `/${subreddit}`, 
    postRoute: (subreddit, postId, postName) => `/${subreddit}/comments/${postId}/${postName}`,
    searchRoute: () => `/search`
};
  
export default ROUTES;