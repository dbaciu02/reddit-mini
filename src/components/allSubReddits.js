import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../app/routes';
import './allSubReddits.css';

const AllSubreddits = () => {
  const [subreddits, setSubreddits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subreddits from Reddit API
  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await fetch('https://www.reddit.com/r/popular.json');
        const data = await response.json();
        console.log('Reddit response data:', data); // Log the response for inspection

        const subredditList = data.data.children.map((child) => ({
          id: child.data.id,
          subreddit: child.data.subreddit
          // description: child.data.public_description,
        }));

        console.log('Subreddit list:', subredditList); // Log the mapped list for inspection
        setSubreddits(subredditList);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch subreddits:', err);
        setError('Failed to fetch subreddits.');
        setLoading(false);
      }
    };

    fetchSubreddits();
  }, []);

  if (loading) {
    return <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <div className='row w-100'>
        <h1 className='text-center mb-4'>All Subreddits</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
        {subreddits.map((subreddit) => (
          <div key={subreddit.id} className="col">
            <div className="card h-100">
              <div className="card-body" id='allSubs'>
                <h5 className="card-title">
                  <Link 
                    to={ROUTES.subredditRoute(subreddit.subreddit)} 
                    className="text-decoration-none">
                    {subreddit.subreddit}
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        ))}

      </div> {/* end of subreddit row */}
    </div> // end of container
  );
};

export default AllSubreddits;
