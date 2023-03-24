import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';
import StyledText from '../StyledText';
import { COLORS, ROUTES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { getGenderIcon } from '../../helpers.js';
import {
  getFavoriteCharacters,
  setFavoriteCharacters,
} from '../../action/favorite';

const FavoriteScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const favoriteCharacters = useSelector(
    (state) => state.favorite.favoriteCharacters
  );


  React.useEffect(() => {
    dispatch(getFavoriteCharacters());
  }, [dispatch]);

  const FeedItem = ({ item, index, navigation }) => {
    return (
      <View
        style={{
          ...styles.container,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTES.CHARACTER_DETAILS, {
              id: item.id,
              backRoute: ROUTES.FAVORITE,
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
                onPress={() => {
                  Alert.alert(
                    //title
                    'Uyarı',
                    //body
                    `${item.name} isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`,
                    [
                      {
                        text: 'Evet',
                        onPress: () => dispatch(setFavoriteCharacters(item)),
                      },
                      {
                        text: 'Hayır',
                        onPress: () => console.log('No Pressed'),
                      },
                    ],
                    { cancelable: false }
                    //clicking out side of alert will not cancel
                  );
                }}>
                <Ionicons name={'trash'} size={18} color={'#F98D8A'} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView styles={styles.main}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.EPISODES);
            }}>
            <Image source={require('../../assets/back.png')} />
          </TouchableOpacity>
        
        </View>
        <StyledText
          style={{ marginTop: 50, marginBottom: 30 }}
          fontSize={25}
          fontWeight={'700'}
          text={'Favorites'}
          color={COLORS.black}
        />
        <View>
          <FlatList
            data={favoriteCharacters}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <FeedItem item={item} index={index} navigation={navigation} />
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
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
});
