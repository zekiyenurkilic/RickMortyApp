import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getEpisodes } from '../../../action/episode';
import { COLORS } from '../../../constants';
import { useDispatch } from 'react-redux';


const Pagination = ({ episodesData, _ref }) => {
  const dispatch = useDispatch();
  const isPrevPage = !!episodesData.info.prev;
  const isNextPage = !!episodesData.info.next;
  const nextPage = episodesData.activePage + 1;
  const prevPage = episodesData.activePage - 1;

  const activePage = episodesData.activePage;

  const handlePagination = (page) => {
    if (_ref.current) {
      _ref.current.scrollToIndex({ index: 0 });
    }
    dispatch(getEpisodes(page));
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

export default Pagination;

const styles = StyleSheet.create({
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
