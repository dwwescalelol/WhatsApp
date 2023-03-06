import { FlatList } from 'react-native';
import chats from '../../assets/data/chats.json';
import ContactListItem from '../components/ContactListItem';

const ContactsScreen = () => {
  const sortedChats = chats.sort((a, b) => a.user.name.localeCompare(b.user.name));

  return (
    <FlatList
      data={sortedChats}
      renderItem={({ item }) => <ContactListItem user={item.user} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ContactsScreen;
