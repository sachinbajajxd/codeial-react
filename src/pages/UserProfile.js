import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
// import Loader from '../components';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { fetchUserProfile, addFriend, removeFriend} from '../api';
import { Loader } from '../components';

const UserProfile = () => {
  // const location= useLocation();
  // // console.log('location', location);
  // const user = location.state;
  // // console.log(user);
  // // const user = {};

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [requestInProgress, setRequestInProgress] = useState(false);
  // console.log(userId);
  const history = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        toast.success('Fetched successfully');
        setUser(response.data.user);
      } else {
        toast.error(`${response.message}`);
        
        return history('/');
      }

      setLoading(false);
    };

    getUser();
  }, [userId, history]);
  
  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if (response.success) {
      const { friendship } = auth.user.friendships.filter(friend => friendship.to_user._id === userId);

      auth.updateUserFriends(false, friendship[0]);
      toast.success('Friend removed successfully!');
    } else {
      toast.error(`${response.message}`);
      console.log(response.message);
    }
    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;

      auth.updateUserFriends(true, friendship);
      toast.success('Friend added successfully!');
    } else {
      toast.error(`${response.message}`);
      console.log(response.message);
    }
    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://freesvg.org/storage/img/thumb/abstract-user-flat-3.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`} onClick={handleRemoveFriendClick} disabled={requestInProgress} >{requestInProgress ? 'Removing friend...' : 'Remove friend'}</button>
        ) : (
          <button className={`button ${styles.saveBtn}`} onClick={handleAddFriendClick} disabled={requestInProgress} >{requestInProgress ? 'Adding friend...' : 'Add friend'}</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
