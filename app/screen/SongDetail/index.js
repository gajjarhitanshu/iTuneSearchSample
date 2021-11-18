import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Input, Slider} from 'react-native-elements';
import Video from 'react-native-video';
import BaseColor from '../../config/colors';
import styles from './styles';

export default function SongDetail({navigation, route}) {
  const {artistData} = route.params;

  const [detailData, setdetailData] = useState(artistData);

  const [pause, setpause] = useState(true);
  const [currentTime, setcurrentTime] = useState();
  const [duration, setduration] = useState();

  const [albumList, setalbumList] = useState([]);

  useEffect(() => {
    getalbumList();
  }, []);

  //Api call to get more albums of artist
  const getalbumList = () => {
    url = `https://itunes.apple.com/lookup?id=${detailData?.collectionArtistId}&entity=album`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setalbumList(result?.results);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 23 ~ searchArtist ~ err', err);
      });
  };

  //Render More albums of Artist
  const renderArtistList = ({item, index}) => {
    if (index != 0) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setdetailData(item);
          }}>
          <Image
            source={{uri: item?.artworkUrl100}}
            style={styles.songArtwork}
          />
        </TouchableOpacity>
      );
    }
  };

  //Render if list is Empty
  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: BaseColor.whiteColor,
          }}>
          Nothing to show more
        </Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.root}>
        <View style={{flex: 1}}>
          <Text style={styles.titleTxt}>{detailData?.artistName}</Text>
          {detailData?.previewUrl ? (
            <View>
              <Video
                source={{
                  uri: detailData?.previewUrl,
                }}
                paused={pause}
                repeat
                onLoad={(data) => {
                  setduration(data?.duration);
                }}
                onProgress={(data) => {
                  setcurrentTime(data?.currentTime);
                }}
                resizeMode="contain"
                style={styles.videoStyle}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setpause(!pause)}
                style={styles.playIcon}>
                <Icon
                  name={pause ? 'play-circle' : 'pause-circle'}
                  type="font-awesome"
                  color={BaseColor.grey}
                  size={48}
                />
              </TouchableOpacity>

              <Slider
                value={currentTime}
                maximumValue={duration}
                disabled
                trackStyle={{height: 4}}
                thumbStyle={styles.thumbStyle}
                style={styles.slider}
              />
            </View>
          ) : (
            <View>
              <Image
                source={{uri: detailData?.artworkUrl100}}
                style={styles.artistView}
                resizeMode="contain"
              />
              <Text style={[styles.noPreTxt]}>
                No Preview of Audio or Video Available!
              </Text>
            </View>
          )}
        </View>

        <View>
          <Text
            style={[styles.titleTxt, {color: BaseColor.grey, marginTop: 64}]}>
            More by Artist
          </Text>
          <FlatList
            horizontal
            contentContainerStyle={{
              height: 60,
            }}
            keyExtractor={(item, index) => `${index}`}
            data={albumList}
            renderItem={renderArtistList}
            ListEmptyComponent={renderEmpty}
          />
        </View>
      </View>
    </>
  );
}
