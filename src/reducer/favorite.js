import {
  GET_FAVORITE_CHARACTERS,
  SET_FAVORITE_CHARACTERS,
} from '../action/types';

const initialState = {
  favoriteCharacters: [],
  favoriteCharactersLimit: 10,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FAVORITE_CHARACTERS:
      return {
        ...state,
        favoriteCharacters: payload,
      };

    case SET_FAVORITE_CHARACTERS:
      return {
        ...state,
        favoriteCharacters: payload,
      };

    default:
      return state;
  }
}
