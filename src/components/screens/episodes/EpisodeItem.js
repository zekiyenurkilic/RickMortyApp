import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import StyledText from '../../StyledText';
import { COLORS, ROUTES } from '../../../constants';
import { getRandomColor } from '../../../helpers.js';

const { width, height } = Dimensions.get('screen');

const EpisodeItem = ({ item, index, navigation }) => {
  const translateYImage = new Animated.Value(-10);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: (index + 1) * 170,
    useNativeDriver: true,
    easing: Easing.linear,
  }).start();

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [
          {
            translateY: translateYImage,
          },
        ],
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.EPISODE_DETAILS, item.id)}
        style={{
          borderColor: getRandomColor(),
          borderWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 4,
        }}>
        <StyledText
          fontSize={12}
          fontWeight="400"
          text={item.air_date}
          color={COLORS.black}
          style={{ alignSelf: 'flex-end' }}
        />
        <StyledText
          fontSize={12}
          fontWeight="700"
          text={item.name}
          color={COLORS.black}
          style={{ width: '70%' }}
        />
        <StyledText
          fontSize={12}
          fontWeight="400"
          text={item.episode}
          color={COLORS.black}
          style={{ alignSelf: 'flex-end' }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default EpisodeItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    position: 'relative',
  },
});
