import React from 'react';
import { View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import DraftListItem from './DraftListItem';

const MAX_WIDTH = 500;
const screenWidth = Dimensions.get('window').width;
const drawerWidth = Math.min(MAX_WIDTH, screenWidth * 0.7);

const Drafts = ({
  visible,
  onClose,
  drafts,
  onElementPress,
  onElementDelete,
  onElemenetSchedule,
}) => {
  const renderItem = ({ item }) => (
    <DraftListItem
      draft={item}
      onPress={onElementPress}
      onDelete={onElementDelete}
      onSchedule={onElemenetSchedule}
    />
  );

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: drawerWidth, backgroundColor: '#fff' }}>
          <FlatList data={drafts} renderItem={renderItem} />
        </View>

        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
      </View>
    </Modal>
  );
};

Drafts.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  drafts: PropTypes.array,
  onElementPress: PropTypes.func,
  onElementDelete: PropTypes.func,
  onElemenetSchedule: PropTypes.func,
};

export default Drafts;
