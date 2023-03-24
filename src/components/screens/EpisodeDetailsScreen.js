import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  Keyboard,
  ScrollView,
} from 'react-native';
import React from 'react';
import StyledText from '../StyledText';
import { COLORS, ROUTES } from '../../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { getGenderIcon } from '../../helpers.js';
const { width, height } = Dimensions.get('screen');
import { useDispatch, useSelector } from 'react-redux';
import { getEpisodeDetails, getEpisodeCharacters } from '../../action/episode';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { setFavoriteCharacters } from '../../action/favorite';
import Loading from '../Loading';

const EpisodeDetailsScreen = ({ route, navigation }) => {
  const id = route.params;
  const dispatch = useDispatch();
  const [activePage, setActivePage] = React.useState(1);

  const episodeDetails = useSelector((state) => state.episode.episodeDetails);
  const episodeCharacters = useSelector(
    (state) => state.episode.episodeCharacters
  );
  const favoriteCharacters = useSelector(
    (state) => state.favorite.favoriteCharacters
  );

  const characterPageLimit = 8;

  React.useEffect(() => {
    dispatch(getEpisodeDetails(id));
  }, [id, dispatch]);

  React.useEffect(() => {
    if (episodeDetails) {
      dispatch(
        getEpisodeCharacters(
          episodeDetails.characters,
          activePage,
          characterPageLimit
        )
      );
    }
  }, [episodeDetails, dispatch, activePage]);

  if (!episodeDetails) {
    return <Loading />;
  }

  const pageCount = Math.ceil(
    episodeDetails.characters?.length / characterPageLimit
  );

  const Pagination = () => {
    const isPrevPage =
      activePage === 1 ? false : !!(activePage - 1 < activePage);
    const isNextPage = !!(activePage + 1 <= pageCount);
    const nextPage = activePage + 1;
    const prevPage = activePage - 1;

    const handlePagination = (page) => {
      setActivePage(page);
    };

    return (
      <View
        style={{
          marginBottom: 100,
          justifyContent: 'center',
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
        }}>
        {activePage >= 3 && (
          <TouchableOpacity
            onPress={() => {
              handlePagination(1);
            }}
            style={{ ...styles.page }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons name="arrow-back" size={16} />
            </View>
          </TouchableOpacity>
        )}

        {isPrevPage && (
          <TouchableOpacity
            onPress={() => {
              handlePagination(prevPage);
            }}
            style={{ ...styles.page }}>
            <Text>{prevPage}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            handlePagination(activePage);
          }}
          style={{ ...styles.page, borderColor: 'gray' }}>
          <Text>{activePage}</Text>
        </TouchableOpacity>

        {isNextPage && (
          <TouchableOpacity
            onPress={() => {
              handlePagination(nextPage);
            }}
            style={styles.page}>
            <Text>{nextPage}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const FeedItem = ({ item, index, navigation }) => {
    const isFavorite = favoriteCharacters.some((fav) => fav.id === item.id);
    return (
      <View
        style={{
          ...styles.container,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTES.CHARACTER_DETAILS, {
              id: item.id,
              backRoute: '',
            })
          }
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
            }}>
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
            <View>
              <TouchableOpacity
                onPress={() => dispatch(setFavoriteCharacters(item))}>
                <Ionicons
                  name={isFavorite ? 'md-heart' : 'md-heart-outline'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <View>
        <View style={{ ...styles.container, height: 220 }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ROUTES.EPISODES);
              }}>
              <Image source={require('../../assets/back.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 30 }}>
            <View>
              <StyledText
                fontSize={12}
                fontWeight="400"
                text={episodeDetails.air_date}
                color={COLORS.black}
                style={{ alignSelf: 'flex-end' }}
              />
              <StyledText
                fontSize={20}
                fontWeight="700"
                text={episodeDetails.name}
                color={COLORS.black}
                style={{}}
              />
              <StyledText
                fontSize={12}
                fontWeight="400"
                text={episodeDetails.episode}
                color={COLORS.black}
                style={{ alignSelf: 'flex-end' }}
              />
            </View>
            <View
              style={{ borderWidth: 1, borderColor: COLORS.lightGray }}></View>
            <View style={{ marginTop: 30 }}>
              <StyledText
                fontSize={20}
                fontWeight="700"
                text={'Characters'}
                color={COLORS.black}
                style={{ marginBottom: 16 }}
              />
            </View>
          </View>
        </View>
        <View style={styles.vwList}>
          <FlatList
            data={episodeCharacters}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <FeedItem item={item} index={index} navigation={navigation} />
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        </View>
        <Pagination />
      </View>
    </SafeAreaView>
  );
};

export default EpisodeDetailsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  container: {
    paddingHorizontal: 30,
  },
  vwList: {
    height: height - 370,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  page: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.transparentGray,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    color: COLORS.white,
    fontWeight: 500,
  },
});
