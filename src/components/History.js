import React, { useRef } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import HistoryItem from '~/components/HistoryItem';

const keyExtractor = (item, index) => {
  return String(index);
};

const History = ({ items }) => {
  const $list = useRef();

  const scrollToBottom = () => {
    $list.current.scrollToEnd?.({ animated: true });
  };

  return (
    <View style={s.root}>
      <View style={{ flex: 1 }} />

      <View>
        <FlatList
          ref={$list}
          style={s.list}
          data={items}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => <HistoryItem {...item} />}
          onContentSizeChange={scrollToBottom}
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default History;
