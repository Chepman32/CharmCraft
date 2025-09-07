import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SimpleTest: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CharmCraft Test</Text>
      <Text style={styles.subtext}>
        If you see this, the basic app structure works
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  subtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default SimpleTest;
