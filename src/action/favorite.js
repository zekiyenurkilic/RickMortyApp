import { GET_FAVORITE_CHARACTERS, SET_FAVORITE_CHARACTERS } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store';
import { Alert } from 'react-native';
const ASYNC_FAVORITE_CHARACTERS_KEY = '@favoriteCharacters';

export const getFavoriteCharacters = () => async (dispatch) => {
  try {
    const value = await AsyncStorage.getItem(ASYNC_FAVORITE_CHARACTERS_KEY);
    if (value !== null) {
      dispatch({
        type: GET_FAVORITE_CHARACTERS,
        payload: JSON.parse(value),
      });
    } else {
      dispatch({
        type: GET_FAVORITE_CHARACTERS,
        payload: [],
      });
    }
  } catch (error) {
    console.log('err', error);
  }
};

export const setFavoriteCharacters = (character) => async (dispatch) => {
  try {
    const favoriteCharacters = store.getState().favorite.favoriteCharacters;
    const favoriteCharactersLimit =
      store.getState().favorite.favoriteCharactersLimit;

    const favoriteCharactersLength = favoriteCharacters.length;

    const isExistItem = favoriteCharacters.find(
      (fav) => fav.id === character.id
    );

    let newFavoriteCharacters = favoriteCharacters;

    if (isExistItem) {
      newFavoriteCharacters = newFavoriteCharacters.filter(
        (fav) => fav.id !== character.id
      );

      dispatch({
        type: SET_FAVORITE_CHARACTERS,
        payload: newFavoriteCharacters,
      });
    } else {
      if (favoriteCharactersLimit <= favoriteCharactersLength) {
        Alert.alert(
          'Uyarı',
          'Favori karakter ekleme sayısını aştınız. Başka bir karakteri favoriden çıkarmalısınız.',
          [{ text: 'OK', onPress: () => console.log('Yes Pressed') }],
          { cancelable: false }
        );
        return;
      }

      newFavoriteCharacters = [...newFavoriteCharacters, ...[character]];

      dispatch({
        type: SET_FAVORITE_CHARACTERS,
        payload: newFavoriteCharacters,
      });
    }

    await AsyncStorage.setItem(
      ASYNC_FAVORITE_CHARACTERS_KEY,
      JSON.stringify(newFavoriteCharacters)
    );
  } catch (error) {
    console.log('err', error);
  }
};
