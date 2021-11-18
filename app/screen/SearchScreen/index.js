import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import BaseColor from '../../config/colors';
import {isTemplateElement} from '@babel/types';

export default function SearchScreen({navigation}) {
  const [searchValue, setsearchValue] = useState('');
  const [songList, setsongList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [loadingMore, setloadingMore] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    searchArtist(1);
  }, [searchValue]);

  //Api call to get search result
  const searchArtist = (page) => {
    if (page > 1) {
      setloadingMore(true);
    } else {
      setloading(true);
    }

    const perPage = 10;
    url = `https://itunes.apple.com/search?term=${searchValue}&offset=${page}&limit=${perPage}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (page > 1) {
          setsongList([...songList, ...result?.results]);
        } else {
          setsongList(result?.results);
        }

        setcurrentPage(page);
        setRefreshing(false);
        setloading(false);
        setloadingMore(false);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.js ~ line 23 ~ searchArtist ~ err', err);
      });
  };

  //Pull down Refresh control
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setsongList([]);
    searchArtist(1);
  }, []);

  //Render Item for song List
  const renderSongCard = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.listCont}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('SongDetail', {artistData: item})}>
        <Image source={{uri: item?.artworkUrl100}} style={styles.songArtwork} />
        <View style={styles.listSubCont}>
          <Text style={styles.artistTxt}>{item?.artistName}</Text>
          <Text style={styles.collTxt}>{item?.collectionName}</Text>
        </View>
      </TouchableOpacity>
    );
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
            letterSpacing: 2,
          }}>
          Nothing to show
        </Text>
      </View>
    );
  };

  //Footer Render to show loading untill it laods another data
  const renderFooter = () => {
    return (
      <View style={styles.footerCont}>
        {loadingMore ? (
          <ActivityIndicator color={BaseColor.black} size="small" />
        ) : null}
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={BaseColor.white} />
      <View style={styles.root}>
        <View style={styles.header}>
          <TextInput
            value={searchValue}
            placeholder="Search Artist"
            style={styles.searchInput}
            onChangeText={(val) => {
              setsearchValue(val);
            }}
          />
        </View>
        {loading ? (
          <View style={styles.loadingCont}>
            <ActivityIndicator size="large" color={BaseColor.black} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            keyExtractor={(item, index) => `${index}`}
            data={songList}
            renderItem={renderSongCard}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              searchArtist(currentPage + 1);
            }}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
          />
        )}
      </View>
    </>
  );
}
