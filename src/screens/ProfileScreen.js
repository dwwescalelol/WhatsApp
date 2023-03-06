import Profile from "../components/Profile";

/// TODO make profile the user 
const ProfileScreen = ({ route }) => {
  const user = route.params;

  return (
    <Profile user={user.user}/>
  );
};

export default ProfileScreen;