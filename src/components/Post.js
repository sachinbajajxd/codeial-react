import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { createComment } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        toast.success('Comment created successfully!');
      } else {
        toast.error(`${response.message}`);
      }

      setCreatingComment(false);
    }
  };

  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
        <img
              src="https://freesvg.org/storage/img/thumb/abstract-user-flat-3.png"
              alt="user-pic"
            />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
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
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
          <img
                src="https://previews.123rf.com/images/msidiqf/msidiqf1905/msidiqf190500072/121838212-conversation-chat-message-comment-icon-vector.jpg"
                alt="comments-icon"
              />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;
