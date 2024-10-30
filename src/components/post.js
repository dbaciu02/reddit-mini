import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { subreddit, postId, postName } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}/.json`);
        const data = await response.json();
        
        const postData = data[0].data.children[0].data;
        const commentsData = data[1].data.children.map((child) => child.data);
        
        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch post and comments:', err);
        setError('Failed to fetch post and comments.');
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [subreddit, postId, postName]);

  if (loading) {
    return <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container my-4">
      <div className="row">

        {/* Post Column */}
        <div className="col-md-6 mb-4">
          {post && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title">{post.title}</h1>
                <p className="card-text">{post.selftext}</p>
                {post.preview && post.preview.images && (
                  <div className="text-center my-3">
                    <img 
                      src={post.preview.images[0].source.url.replace(/&amp;/g, '&')} 
                      alt={`Visual for ${post.title}`} 
                      className="img-fluid rounded"
                      style={{ maxHeight: '300px' }} 
                    />
                  </div>
                )}
                <p className="card-text"><strong>Score:</strong> {post.score}</p>
                <p className="card-text"><strong>Author:</strong> {post.author_fullname}</p>
              </div>
            </div>
          )}
        </div>

        {/* Comments Column */}
        <div className="col-md-6">
          <h3>Comments</h3>
          <ul className="list-group">
            {comments.map((comment) => (
              <li key={comment.id} className="list-group-item mb-3 shadow-sm rounded">
                <p>{comment.body}</p>
                <p><strong>Author:</strong> {comment.author}</p>
                <p><strong>Score:</strong> {comment.score}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default Post;
