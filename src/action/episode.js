import {
  GET_EPISODES,
  GET_EPISODES_LOADING,
  BASE_URL,
  GET_EPISODE_DETAILS,
  GET_EPISODES_CHARACTERS,
  GET_CHARACTER_DETAILS,
} from './types';

export const getEpisodes = (page) => async (dispatch) => {
  dispatch({
    type: GET_EPISODES_LOADING,
    payload: true,
  });

  try {
    const response = await fetch(`${BASE_URL}/episode/?page=${page}`);

    const data = await response.json();

    dispatch({
      type: GET_EPISODES,
      payload: { ...data, activePage: page },
    });
  } catch (error) {
  } finally {
    dispatch({
      type: GET_EPISODES_LOADING,
      payload: false,
    });
  }
};

export const getEpisodeDetails = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/episode/${id}`);

    const data = await response.json();

    dispatch({
      type: GET_EPISODE_DETAILS,
      payload: data,
    });
  } catch (error) {
    console.log('err', error);
  } finally {
  }
};

export const getCharacterDetails = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);

    const data = await response.json();

    dispatch({
      type: GET_CHARACTER_DETAILS,
      payload: data,
    });
  } catch (error) {
    console.log('err', error);
  } finally {
   
  }
};

export const getEpisodeCharacters =
  (characters, page, limit) => async (dispatch) => {
    const _page = page * limit - limit;
    const _limit = page * limit;

    const slicedCharacters = characters.slice(_page, _limit);

    try {
      let charactersArray = [];
      async function getCharacters() {
        for (let index = 0; index < slicedCharacters.length; index++) {
          const url = slicedCharacters[index];
          const response = await fetch(`${url}`);

          const data = await response.json();

          charactersArray.push(data);
        }
      }

      await getCharacters();

      dispatch({
        type: GET_EPISODES_CHARACTERS,
        payload: charactersArray,
      });
    } catch (error) {
      console.log('err', error);
    } finally {
    }
  };
