import { Text, View,StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const Loading = () => {
  return (
    <View
      style={{
        ...styles.main,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Loading</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    position: 'relative',
  },
});
