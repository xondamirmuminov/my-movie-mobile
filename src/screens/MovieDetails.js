import React from 'react';
import {ScrollView, View, ImageBackground, Image, Linking} from 'react-native';
import {useEffect, useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import axios from '../utils/axios';
import Styled from '../styles';
import configs from '../configs';
import {sendQuery} from '../utils/axios';
import Urls from '../utils/urls';
import {COLORS} from '../constants';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MovieDetails = ({navigation, route}) => {
  const [data, setData] = useState({});
  const [credits, setCredits] = useState({});
  const [keywords, setKeywords] = useState({});
  const [image, setImage] = useState({});
  const [video, setVideo] = useState({});
  const [collection, setCollection] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [social, setSocial] = useState({});
  const [account, setAccount] = useState({});
  const [favorite, setFavorite] = useState();
  const [watchList, setWatchList] = useState();
  const id = route?.params?.id;

  const fetchData = async () => {
    const {data} = await axios.get(`movie/${id}?api_key=${configs.API_KEY}`);
    setData(data);
  };

  const fetchCredits = async () => {
    const {data} = await axios.get(
      `movie/${id}/credits?api_key=${configs.API_KEY}`,
    );
    setCredits(data);
  };

  const fetchImages = async () => {
    const {data} = await axios.get(
      `movie/${id}/images?api_key=${configs.API_KEY}`,
    );
    setImage(data);
  };

  const fetchVideos = async () => {
    const {data} = await axios.get(
      `movie/${id}/videos?api_key=${configs.API_KEY}`,
    );
    setVideo(data);
  };

  const fetchCollection = async () => {
    const {data: collection} = await axios.get(
      `collection/${data?.belongs_to_collection?.id}?api_key=${configs.API_KEY}`,
    );
    setCollection(collection);
  };

  const fetchRecommendations = async () => {
    const {data} = await axios.get(
      `movie/${id}/recommendations?api_key=${configs.API_KEY}`,
    );
    setRecommendations(data);
  };

  const fetchKeywords = async () => {
    const {data} = await axios.get(
      `movie/${id}/keywords?api_key=${configs.API_KEY}`,
    );
    setKeywords(data);
  };

  const fetchSocial = async () => {
    const {data} = await axios.get(
      `movie/${id}/external_ids?api_key=${configs.API_KEY}`,
    );
    setSocial(data);
  };

  const fetchAccount = async () => {
    const {data} = await axios.get(
      `movie/${id}/account_states?api_key=${configs.API_KEY}&session_id=${configs.SESSION_ID}`,
    );
    setAccount(data);
    setFavorite(data?.favorite);
    setWatchList(data?.watchlist);
  };

  const handleLink = url => {
    Linking.openURL(url);
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

  FontAwesomeIcon.loadFont();

  return (
    <Styled.SafeAreaView>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: configs.IMG_URL + (data?.poster_path ?? data?.backdrop_path),
            }}
            resizeMode="stretch"
            style={{width: '100%', height: 350}}
          />
          <Styled.Container>
            <Styled.Title size={26} weight={600} mt={25}>
              {data?.original_title}
            </Styled.Title>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                {data?.vote_average < 1 ? (
                  [1, 2, 3, 4, 5].map((item, index) => (
                    <FontAwesomeIcon
                      style={{marginRight: 4}}
                      color={COLORS.RED}
                      name="star-o"
                      size={22}
                    />
                  ))
                ) : data?.vote_average == 1 || data?.vote_average < 3 ? (
                  <>
                    <FontAwesomeIcon
                      style={{marginRight: 4}}
                      color={COLORS.RED}
                      name="star"
                      size={22}
                    />
                    {[1, 2, 3, 4].map((item, index) => (
                      <FontAwesomeIcon
                        style={{marginRight: 4}}
                        color={COLORS.RED}
                        name="star-o"
                        size={22}
                      />
                    ))}
                  </>
                ) : data?.vote_average == 3 || data?.vote_average < 4 ? (
                  <>
                    <FontAwesomeIcon
                      style={{marginRight: 4}}
                      color={COLORS.RED}
                      name="star"
                      size={22}
                    />
                    <FontAwesomeIcon
                      style={{marginRight: 4}}
                      color={COLORS.RED}
                      name="star"
                      size={22}
                    />
                    {[1, 2, 3].map((item, index) => (
                      <FontAwesomeIcon
                        style={{marginRight: 4}}
                        color={COLORS.RED}
                        name="star-o"
                        size={22}
                      />
                    ))}
                  </>
                ) : data?.vote_average == 5 || data?.vote_average < 6 ? (
                  <>
                    {[1, 2, 3].map((item, index) => (
                      <FontAwesomeIcon
                        style={{marginRight: 4}}
                        color={COLORS.RED}
                        name="star"
                        size={22}
                      />
                    ))}
                    {[1, 2].map((item, index) => (
                      <FontAwesomeIcon
                        style={{marginRight: 4}}
                        color={COLORS.RED}
                        name="star-o"
                        size={22}
                      />
                    ))}
                  </>
                ) : data?.vote_average == 7 || data?.vote_average < 8 ? (
                  <>
                    {[1, 2, 3, 4].map((item, index) => (
                      <FontAwesomeIcon
                        style={{marginRight: 4}}
                        color={COLORS.RED}
                        name="star"
                        size={22}
                      />
                    ))}
                    <FontAwesomeIcon
                      style={{marginRight: 4}}
                      color={COLORS.RED}
                      name="star-o"
                      size={22}
                    />
                  </>
                ) : data?.vote_average == 9 || data?.vote_average < 10 ? (
                  <>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                      <FontAwesomeIcon
                        style={{marginRight: 4}}
                        color={COLORS.RED}
                        name="star"
                        size={22}
                      />
                    ))}
                  </>
                ) : null}
              </View>
              <Styled.Text size={20} weight={500} ml={5} color={COLORS.RED}>
                {data?.vote_average?.toString().length == 5
                  ? data?.vote_average?.toString().slice(0, 3)
                  : data?.vote_average?.toString()}
              </Styled.Text>
              <Styled.Text size={18} ml={10} color={COLORS.WHITE}>
                {moment(data?.release_date).format('L')}
              </Styled.Text>
              <Styled.Text size={18} ml={15} color={COLORS.WHITE}>
                {hour}h {minute}m
              </Styled.Text>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: 15, flexWrap: 'wrap'}}>
              {data?.production_countries?.map(item => (
                <Styled.RedButton
                  key={item?.iso_3166_1}
                  style={{
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: COLORS.RED,
                    marginRight: 10,
                  }}
                  height={45}
                  width={80}
                  borderRadius={10}>
                  <Styled.Text weight={500} size={18} color={COLORS.RED}>
                    {item?.iso_3166_1}
                  </Styled.Text>
                </Styled.RedButton>
              ))}
            </View>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
              {data?.genres?.map((item, index, arr) => (
                <Styled.Text size={16} weight={500} key={item?.id}>
                  {item.name}
                  {arr[arr.length - 1] ? ', ' : ''}
                </Styled.Text>
              ))}
            </View>
            <Styled.Text size={16} weight={500} mt={10}>
              {data?.overview}
            </Styled.Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Styled.Text size={18} weight={500} mr={10}>
                Social:
              </Styled.Text>
              <View style={{flexDirection: 'row'}}>
                {social?.facebook_id && (
                  <TouchableOpacity
                    style={{marginRight: 15}}
                    onPress={() =>
                      handleLink(
                        `https://www.facebook.com/${social?.facebook_id}`,
                      )
                    }>
                    <FontAwesomeIcon
                      color={COLORS.WHITE}
                      name="facebook-official"
                      size={35}
                    />
                  </TouchableOpacity>
                )}
                {social?.instagram_id ? (
                  <TouchableOpacity
                    style={{marginRight: 15}}
                    onPress={() =>
                      handleLink(
                        `https://www.instagram.com/${social?.instagram_id}`,
                      )
                    }>
                    <FontAwesomeIcon
                      color={COLORS.WHITE}
                      name="instagram"
                      size={35}
                    />
                  </TouchableOpacity>
                ) : null}
                {social?.twitter_id ? (
                  <TouchableOpacity
                    style={{marginRight: 15}}
                    onPress={() =>
                      handleLink(
                        `https://www.twitter.com/${social?.twitter_id}`,
                      )
                    }>
                    <FontAwesomeIcon
                      color={COLORS.WHITE}
                      name="twitter"
                      size={35}
                    />
                  </TouchableOpacity>
                ) : null}
                {data?.homepage ? (
                  <TouchableOpacity
                    style={{marginRight: 15}}
                    onPress={() => handleLink(data?.homepage)}>
                    <FontAwesomeIcon
                      color={COLORS.WHITE}
                      name="link"
                      size={35}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Styled.Text size={18} weight={500} mr={10}>
                Status:
              </Styled.Text>
              <Styled.Text size={18} color={COLORS.WHITE} weight={500} mr={10}>
                {data?.status}
              </Styled.Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Styled.Text size={18} weight={500} mr={10}>
                Original Language:
              </Styled.Text>
              <Styled.Text size={18} color={COLORS.WHITE} weight={500} mr={10}>
                {data?.original_language?.toUpperCase()}
              </Styled.Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Styled.Text size={18} weight={500} mr={10}>
                Budget:
              </Styled.Text>
              <Styled.Text size={18} color={COLORS.WHITE} weight={500} mr={10}>
                $ {data?.budget?.toLocaleString('en')}
              </Styled.Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Styled.Text size={18} weight={500} mr={10}>
                Revenue:
              </Styled.Text>
              <Styled.Text size={18} color={COLORS.WHITE} weight={500} mr={10}>
                $ {data?.revenue?.toLocaleString('en')}
              </Styled.Text>
            </View>
            <View style={{marginTop: 20}}>
              <Styled.Text size={20} weight={500} mr={10} color={COLORS.WHITE}>
                Top Billed Cast
              </Styled.Text>
              <ScrollView horizontal={true}>
                {popularCredit?.map(item => (
                  <View key={item?.id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Person', {id: item?.id})
                      }
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 25,
                        paddingVertical: 10,
                      }}>
                      {item?.profile_path ? (
                        <Image
                          source={{
                            uri: configs.IMG_URL + item?.profile_path,
                          }}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            marginTop: 10,
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../assets/images/avatar.png')}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            marginTop: 10,
                          }}
                        />
                      )}
                      <View style={{marginLeft: 10}}>
                        <Styled.Text size={15} weight={500} color="#e9e9e9">
                          {item?.name}
                        </Styled.Text>
                        <Styled.Text size={15} weight={500} color="#e9e9e9">
                          {item?.character}
                        </Styled.Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => navigation.navigate('Casts', {id: id})}>
                    <Styled.Text
                      size={18}
                      weight={500}
                      mr={10}
                      color={COLORS.WHITE}>
                      View More
                    </Styled.Text>
                    <FontAwesomeIcon
                      color="#e9e9e9"
                      name="long-arrow-right"
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </Styled.Container>
        </View>
      </ScrollView>
    </Styled.SafeAreaView>
  );
};

export default MovieDetails;
