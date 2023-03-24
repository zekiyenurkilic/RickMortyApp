import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import StyledText from '../../StyledText';
import { COLORS, ROUTES } from '../../../constants';
import EpisodeItem from './EpisodeItem';
import { useDispatch, useSelector } from 'react-redux';
import { getEpisodes } from '../../../action/episode';
import { getFavoriteCharacters } from '../../../action/favorite';
const { width, height } = Dimensions.get('screen');
import Loading from '../../Loading';
import Pagination from './Pagination';

const EpisodesScreen = ({ navigation }) => {
  const [text, setText] = React.useState('');

  const dispatch = useDispatch();
  const episodesData = useSelector((state) => state.episode.episodesData);

  const ref = React.useRef(null);

  const [searchEpisodes, setSearchEpisodes] = React.useState([]);

  React.useEffect(() => {
    dispatch(getEpisodes(1));
    dispatch(getFavoriteCharacters());
  }, [dispatch]);

   React.useEffect(() => {
    const filteredData = episodesData?.results?.filter((ep) =>
      ep.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchEpisodes(filteredData);
  }, [text]);

  if (!episodesData) {
    return <Loading />;
  }

  const filterEpisode = (text) => {
    setText(text);
  };

 

  return (
    <SafeAreaView style={styles.main}>
      <View showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <View style={{ height: 220 }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack(null)}>
                <Image source={require('../../../assets/back.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.FAVORITE)}>
                <Image source={require('../../../assets/favorite.png')} />
              </TouchableOpacity>
            </View>

            <StyledText
              style={{ marginTop: 20 }}
              fontSize={25}
              fontWeight={'700'}
              text={'Episodes'}
              color={COLORS.black}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search for episode"
                placeholderTextColor={COLORS.lightGray}
                onChangeText={(newText) => filterEpisode(newText)}
                value={text}
              />
              <Image
                style={styles.searchIcon}
                source={require('../../../assets/search.png')}
              />
            </View>
          </View>
          <View style={styles.vwList}>
            <FlatList
              ref={ref}
              data={!!text ? searchEpisodes : episodesData.results}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <EpisodeItem
                  item={item}
                  index={index}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
          <Pagination episodesData={episodesData} _ref={ref} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EpisodesScreen;

const styles = StyleSheet.create({
  vwList: {
    height: height - 370,
  },
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    position: 'relative',
  },
  container: { paddingHorizontal: 30 },
  header: {
    paddingTop: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputContainer: {
    position: 'relative',
    marginHorizontal: 10,
    marginVertical: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 1,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  input: {
    height: 48,
    paddingLeft: 60,
    fontFamily: '400',
    fontSize: 12,
  },

  searchIcon: {
    position: 'absolute',
    left: 20,
    top: 13,
  },
});
