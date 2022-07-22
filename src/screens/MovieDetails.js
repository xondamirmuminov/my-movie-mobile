import React from 'react';
import {ScrollView, View, ImageBackground} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Styled from '../styles';
import configs from '../configs';
import {sendQuery} from '../utils/axios';
import Urls from '../utils/urls';

const MovieDetails = ({navigation, route}) => {
  const [data, setData] = useState({});
  const [credits, setCredits] = useState({});
  const [image, setImage] = useState({});
  const [video, setVideo] = useState({});
  const [collection, setCollection] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [keywords, setKeywords] = useState({});
  const [social, setSocial] = useState({});
  const [account, setAccount] = useState({});
  const [favorite, setFavorite] = useState();
  const [watchList, setWatchList] = useState();
  const id = route?.params?.id;

  const fetchData = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${configs.API_KEY}`,
    );
    setData(data);
  };

  const fetchCredits = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${configs.API_KEY}`,
    );
    setCredits(data);
  };

  const fetchImages = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${configs.API_KEY}`,
    );
    setImage(data);
  };

  const fetchVideos = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${configs.API_KEY}`,
    );
    setVideo(data);
  };

  const fetchCollection = async () => {
    const {data: collection} = await axios.get(
      `https://api.themoviedb.org/3/collection/${data?.belongs_to_collection?.id}?api_key=${configs.API_KEY}`,
    );
    setCollection(collection);
  };

  const fetchRecommendations = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${configs.API_KEY}`,
    );
    setRecommendations(data);
  };

  const fetchKeywords = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${configs.API_KEY}`,
    );
    setKeywords(data);
  };

  const fetchSocial = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${configs.API_KEY}`,
    );
    setSocial(data);
  };

  const fetchAccount = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/account_states?api_key=${configs.API_KEY}&session_id=${configs.SESSION_ID}`,
    );
    setAccount(data);
    setFavorite(data?.favorite);
    setWatchList(data?.watchlist);
  };

  useEffect(() => {
    fetchData();
    fetchCredits();
    fetchImages();
    fetchVideos();
    fetchRecommendations();
    fetchKeywords();
    fetchSocial();
    fetchAccount();
  }, []);

  useEffect(() => {
    fetchData();
    fetchCredits();
    fetchImages();
    fetchVideos();
    fetchRecommendations();
    fetchKeywords();
    fetchSocial();
    fetchAccount();
  }, [id]);

  useEffect(() => {
    if (data?.belongs_to_collection) {
      fetchCollection();
    }
  }, [data]);

  const popularCredit = [
    {...(credits?.cast ? credits?.cast[0] : null)},
    {...(credits?.cast ? credits?.cast[1] : null)},
    {...(credits?.cast ? credits?.cast[2] : null)},
    {...(credits?.cast ? credits?.cast[3] : null)},
    {...(credits?.cast ? credits?.cast[4] : null)},
    {...(credits?.cast ? credits?.cast[5] : null)},
    {...(credits?.cast ? credits?.cast[6] : null)},
    {...(credits?.cast ? credits?.cast[7] : null)},
    {...(credits?.cast ? credits?.cast[8] : null)},
  ];
  const hour = Math.floor(data?.runtime / 60);
  const minute = data?.runtime % 60;

  return (
    <Styled.SafeAreaView>
      <ScrollView>
        <View
          style={{
            height: 375,
            flex: 1,
          }}>
          <ImageBackground
            source={{
              uri: configs.IMG_URL + (data?.poster_path ?? data?.backdrop_path),
            }}
            resizeMode="stretch"
            style={{
              flex: 1,
              aspectRatio: 1.05,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.50)',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                paddingHorizontal: 30,
                paddingBottom: 30,
              }}>
              <Styled.Title>{data?.title}</Styled.Title>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {data?.genres?.map((item, index, arr) => (
                  <Styled.Text size={16} weight={500} key={item?.id}>
                    {item.name}
                    {arr[arr.length - 1] ? '. ' : ''}
                  </Styled.Text>
                ))}
              </View>
              <Styled.RedButton mt={5} width={100} height={35}>
                <Styled.Text size={16} weight={600} color="white">
                  View{' '}
                </Styled.Text>
              </Styled.RedButton>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </Styled.SafeAreaView>
  );
};

export default MovieDetails;
