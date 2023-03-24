import {
  GET_EPISODES,
  GET_EPISODES_LOADING,
  GET_EPISODE_DETAILS,
  GET_EPISODES_CHARACTERS,
  GET_CHARACTER_DETAILS,
} from '../action/types';

const initialState = {
  episodesData: null,
  loading: false,
  pageLimit: 10,
  episodeDetails: null,
  episodeCharacters: [],
  characterDetails: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EPISODES:
      return {
        ...state,
        episodesData: payload,
      };
    case GET_EPISODE_DETAILS:
      return {
        ...state,
        episodeDetails: payload,
      };
    case GET_CHARACTER_DETAILS:
      return {
        ...state,
        characterDetails: payload,
      };

    case GET_EPISODES_CHARACTERS:
      return {
        ...state,
        episodeCharacters: payload,
      };

    case GET_EPISODES_LOADING:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
}
