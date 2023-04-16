import { SafeAreaView, Text, StyleSheet } from 'react-native';

export const ForbiddenScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Forbidden</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
