import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ROUTES from '../app/routes';

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q'); // Extract the search query
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        const response = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        console.log('Fetched search data:', data);

        const postList = data.data.children.map((child) => ({
          id: child.data.id,
          title: child.data.title,
          url: child.data.url,
          selftext: child.data.selftext,
          author: child.data.author_fullname,
          score: child.data.score,
          subredditName: child.data.subreddit_name_prefixed,
          image: child.data.preview ? child.data.preview.images[0].source.url.replace(/&amp;/g, '&') : null,
        }));

        setPosts(postList);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch search results:', err);
        setError('Failed to fetch search results.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (!query) {
    return <p>Please enter a search term.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formatPostName = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_+|_+$)/g, '') + '/';
  };

  return (
    <>
      <div className="container my-4 d-flex flex-column">
        <h1 className="text-center mb-5">Search Results for {query}</h1>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {posts.map((post) => {
            return (
              <div key={post.id} className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link 
                        to={ROUTES.postRoute(post.subreddit, post.id, formatPostName(post.title))} 
                        className="text-decoration-none text-primary"
                      >
                        {post.title}
                      </Link>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {post.author} - {post.subredditName}
                    </h6>
                    <p className="card-text">{post.selftext}</p>
                    {post.image && (
                      <div className="text-center my-3">
                        <img 
                          src={post.image} 
                          alt="Post visual" 
                          className="img-fluid rounded"
                          style={{ maxHeight: '300px' }} 
                        />
                      </div>
                    )}
                    <p className="card-text"><strong>Score:</strong> {post.score}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>

  );
};

export default Search;
