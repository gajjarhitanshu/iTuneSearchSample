import {StyleSheet} from 'react-native';
import BaseColor from '../../config/colors';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BaseColor.white,
    padding: 16,
  },
  titleTxt: {
    color: BaseColor.black,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  playIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songArtwork: {
    height: 60,
    width: 60,
    borderRadius: 8,
    marginEnd: 12,
  },
  artistView: {
    height: 200,
    width: '100%',
    borderRadius: 8,
  },
  noPreTxt: {
    color: BaseColor.grey,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 6,
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  thumbStyle: {
    height: 20,
    width: 20,
    backgroundColor: 'transparent',
  },
  bottomCont: {
    backgroundColor: BaseColor.white,
    padding: 16,
  },
  videoStyle: {
    height: 200,
    width: '100%',
    backgroundColor: BaseColor.black,
  },
});
