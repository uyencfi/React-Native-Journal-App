import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

const TouchableItem =
  Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

export default function JournalItemRow({ item }) {
  const date = new Date(item.date);
  const minutes = date.getMinutes();
  const time = `${date.getHours()}:${(minutes < 10 ? '0' : '') + minutes}`;

  return (
    <TouchableItem>
      <View style={styles.container}>
        <Image source={require('../../foto.png')} style={styles.image} />
        <View style={styles.itemText}>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.text} numberOfLines={3}>
            {item.text}
          </Text>
        </View>
      </View>
    </TouchableItem>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  itemText: {
    flex: 1,
  },
  time: {
    marginBottom: 2,
    color: 'gray',
    fontSize: 12,
    fontWeight: '100',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
