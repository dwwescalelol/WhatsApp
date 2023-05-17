import React from 'react';

import PropTypes from 'prop-types';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import formatTime from '../../utilities/FormatTime';
import IconButton from './IconButton';

const DraftListItem = ({ draft, onPress, onSchedule, onDelete }) => {
  return (
    <View>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            onPress(draft);
          }}
          style={({ pressed }) => [
            {
              flex: 1,
              width: '100%',
              backgroundColor: pressed ? 'lightgray' : 'white',
            },
          ]}
        >
          <View style={styles.mainBody}>
            <View style={styles.textContent}>
              <Text> {draft.message} </Text>
              <Text style={styles.time}>{formatTime(draft.timestamp)}</Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.buttons}>
          <IconButton iconName="timer-outline" onPress={onSchedule} />
          <IconButton iconName="ios-remove-circle" onPress={onDelete} />
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

DraftListItem.propTypes = {
  draft: PropTypes.object,
  onPress: PropTypes.func,
  onSchedule: PropTypes.func,
  onDelete: PropTypes.func,
};

const styles = StyleSheet.create({
  mainBody: {
    width: '100%',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 5,
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContent: {
    alignItems: 'flex-start',
    flexDirection: 'coloumn',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'lightgray',
  },
  time: {
    color: 'grey',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default DraftListItem;
