import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';
import propTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { Comment, Loader, FriendsList, CreatePost, Post } from '../components';
import { useAuth, usePosts } from '../hooks';


const Home = () => {

  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState([]);
  const auth=useAuth();
  const posts=usePosts();

  // console.log(posts);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();

  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }

  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
        <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map(post => (
          <Post post={post} key={`post-${post._id}`} />
         ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

Home.propTypes = {
  posts: propTypes.array.isRequired,
}

export default Home;
