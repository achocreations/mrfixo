// /frontend/components/Reviews.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Reviews = ({ reviews }) => {
  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.review}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.comment}>{item.comment}</Text>
          <Text style={styles.rating}>Rating: {item.rating}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  review: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 5,
  },
  userName: {
    fontWeight: 'bold',
  },
  comment: {
    marginVertical: 5,
  },
  rating: {
    color: 'gray',
  },
});

export default Reviews;
