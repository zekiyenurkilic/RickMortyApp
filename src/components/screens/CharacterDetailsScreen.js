import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { COLORS, ROUTES } from '../../constants';
import StyledText from '../StyledText';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { getCharacterDetails } from '../../action/episode';
import { setFavoriteCharacters } from '../../action/favorite';
import { getGenderIcon } from '../../helpers.js';
const { width, height } = Dimensions.get('screen');

const CharacterDetailsScreen = ({ route, navigation }) => {
  const { id, backRoute } = route.params;
  const dispatch = useDispatch();

  const characterDetails = useSelector(
    (state) => state.episode.characterDetails
  );
  const favoriteCharacters = useSelector(
    (state) => state.favorite.favoriteCharacters
  );

  React.useEffect(() => {
    dispatch(getCharacterDetails(id));
  }, [id, dispatch]);

  const Loading = () => {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  };

  if (!characterDetails) {
    return <Loading />;
  }

  const FeedItem = ({ item, index, navigation }) => {
    return (
      <View
        style={{
          ...styles.container,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginRight: 20,
            }}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={{ uri: item.image }}
            />
          </View>
          <View>
            <StyledText
              fontSize={12}
              fontWeight="700"
              text={item.name}
              color={COLORS.black}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
              }}>
              <FontAwesome name={getGenderIcon(item.gender)} />
              <StyledText
                fontSize={12}
                fontWeight="400"
                text={item.gender}
                color={COLORS.black}
                style={{ marginLeft: 8 }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const isFavorite = favoriteCharacters.some(
    (fav) => fav.id === characterDetails.id
  );

  return (
    <SafeAreaView style={styles.main}>
      <View>
        <View style={{ ...styles.container }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                !!backRoute
                  ? navigation.navigate(backRoute)
                  : navigation.goBack()
              }>
              <Image source={require('../../assets/back.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setFavoriteCharacters(characterDetails))}>
              <Ionicons
                name={isFavorite ? 'md-heart' : 'md-heart-outline'}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Image
                style={{
                  width: 250,
                  height: 250,
                  overflow: 'hidden',
                  borderRadius: 250,
                }}
                source={{ uri: characterDetails.image }}
                resizeMode="contain"
              />
            </View>
          </View>
          <View
            style={{
              padding: 10,
              marginTop: 20,
              borderWidth: 2,
              borderColor: COLORS.lightGray,
              borderRadius: 10,
            }}>
            <View style={styles.cardItem}>
              <StyledText
                fontSize={15}
                fontWeight="700"
                text={'Name:'}
                color={COLORS.black}
                style={{ marginBottom: 10 }}
              />

              <StyledText
                fontSize={20}
                fontWeight="400"
                text={characterDetails.name}
                color={COLORS.black}
                style={{ marginBottom: 10 }}
              />
            </View>
            <View style={styles.cardItem}>
              <StyledText
                fontSize={15}
                fontWeight="700"
                text={'Species:'}
                color={COLORS.black}
                style={{ marginBottom: 10 }}
              />
              <StyledText
                fontSize={20}
                fontWeight="400"
                text={characterDetails.species}
                color={COLORS.black}
                style={{ marginBottom: 10 }}
              />
            </View>
            <View style={styles.cardItem}>
              <StyledText
                fontSize={15}
                fontWeight="700"
                text={'Gender:'}
                color={COLORS.black}
                style={{ marginBottom: 10 }}
              />
              <StyledText
                fontSize={20}
                fontWeight="400"
                text={characterDetails.gender}
                color={COLORS.black}
                style={{ marginBottom: 10 }}
              />
            </View>

            <View style={styles.cardItem}>
              <StyledText
                fontSize={15}
                fontWeight="700"
                text={'Count of Episodes:'}
                color={COLORS.black}
                style={{ marginBottom: 10 }}
              />
              <StyledText
                fontSize={20}
                fontWeight="400"
                text={characterDetails.episode?.length}
                color={COLORS.black}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CharacterDetailsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  container: {
    paddingHorizontal: 30,
  },

  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
