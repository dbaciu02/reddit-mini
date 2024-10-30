import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ROUTES from '../app/routes';
import './subReddit.css';

const Subreddit = () => {
  const { subreddit } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from the subreddit
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        const data = await response.json();
        console.log('Fetched data:', data); 

        const postList = data.data.children.map((child) => {
          console.log('Child Data:', child.data); // Log image data
          return {
            id: child.data.id,
            title: child.data.title,
            url: child.data.url,
            selftext: child.data.selftext,
            author: child.data.author_fullname,
            score: child.data.score,
            subredditName: child.data.subreddit_name_prefixed,
            //type: child.data.link_flair_text.t,
            image: child.data.preview ? child.data.preview.images[0].source.url.replace(/&amp;/g, '&') : null
          };
        });
        console.log(postList);
        setPosts(postList);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to fetch posts.');
        setLoading(false);
      }
    };
    fetchPosts();
  }, [subreddit]);

  if (loading) {
    return <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formatPostName = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_+|_+$)/g, '') + '/';
  };

  return (
    <div className="container d-flex flex-column" id='subRedditList'>
      <h1 className='text-center mb-4'>{subreddit}</h1>

      <ul className="list-unstyled">
        {posts.map((post) => {
          const postLink = ROUTES.postRoute(subreddit, post.id, formatPostName(post.title));
          
          // Log the generated link for each post - debugging
          console.log('Generated Post Link:', postLink);
          
          return (
            <li key={post.id} className="mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={postLink} className="text-decoration-none text-primary">
                      {post.title}
                    </Link>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {post.author} - {post.subredditName}
                  </h6>
                  <p className="card-text">{post.selftext}</p>
                  {post.image && (
                    <div className="text-center mb-3">
                      <img src={post.image} alt="Post visual" className="img-fluid rounded" style={{ maxHeight: '300px' }} />
                    </div>
                  )}
                  <p className="card-text">
                    <strong>Score:</strong> {post.score}
                  </p>
                </div>
              </div>
            </li>
          );
        })}{/* end of map */}
      </ul>{/* end of list */}
    </div>//end of container

  );
};

export default Subreddit;

