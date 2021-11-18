import {StyleSheet} from 'react-native';
import BaseColor from '../../config/colors';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BaseColor.white,
  },
  header: {
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    backgroundColor: BaseColor.white,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: BaseColor.grey,
    paddingStart: 16,
  },
  listCont: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    flexDirection: 'row',
    backgroundColor: BaseColor.white,
    padding: 12,
    marginVertical: 8,
  },
  songArtwork: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  listSubCont: {
    justifyContent: 'center',
    paddingStart: 12,
  },
  artistTxt: {
    fontWeight: 'bold',
    fontSize: 22,
    color: BaseColor.black,
  },
  collTxt: {
    fontSize: 14,
    color: BaseColor.subTxt,
  },
  loadingCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerCont: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
