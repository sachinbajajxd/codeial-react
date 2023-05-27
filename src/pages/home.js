import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';
import propTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { Comment, Loader } from '../components';


const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.postsList}>
      {posts.map(post => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://freesvg.org/storage/img/thumb/abstract-user-flat-3.png"
              alt="user-pic"
            />
            <div>
              <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>{post.user.name}</Link>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>{post.content}</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/590/686/small/casino-poker-heart-figure-line-style-icon-free-vector.jpg"
                alt="likes-icon"
              />
              <span>5</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img
                src="https://previews.123rf.com/images/msidiqf/msidiqf1905/msidiqf190500072/121838212-conversation-chat-message-comment-icon-vector.jpg"
                alt="comments-icon"
              />
              <span>2</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
        </div>
      </div>
      ))}
    </div>
  );
};

Home.propTypes = {
  posts: propTypes.array.isRequired,
}

export default Home;
