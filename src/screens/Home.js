import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useEffect, useState} from 'react';
import axios from '../utils/axios';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Styled from '../styles';
import {sendQuery} from '../utils/axios';
import Urls from '../utils/urls';
import configs from '../configs';

const Home = ({navigation}) => {
  const [state, setState] = useState({
    tv: [],
    week: [],
  });
  const [trendingMovie, setTrendingMovie] = useState({});
  const [trending, setTrending] = useState([]);

  const fetchTrendingMovie = async () => {
    const data = await sendQuery(Urls.TRENDING);
    if (data) {
      setTrending([...data?.results]);
    }
  };

  const fetchTV = async () => {
    const result = await sendQuery(Urls.TV_POPULAR);
    setState(state => ({...state, tv: result?.results}));
  };

  const fetchTrendingWeek = async () => {
    const result = await sendQuery(Urls.TRENDING_WEEK);
    setState(state => ({...state, week: result?.results}));
  };

  const fetchTrendingMovieDetails = async () => {
    const {data} = await axios.get(
      `movie/${trending[0].id}?api_key=${configs.API_KEY}`,
    );
    setTrendingMovie(data);
  };

  useEffect(() => {
    fetchTrendingMovie();
    fetchTV();
    fetchTrendingWeek();
  }, []);

  useEffect(() => {
    fetchTrendingMovieDetails();
  }, [trending]);

  FontAwesomeIcon.loadFont();

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
              uri:
                configs.IMG_URL +
                (trending[0]?.poster_path ?? trending[0]?.backdrop_path),
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
              <Styled.Title>{trending[0]?.title}</Styled.Title>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {trendingMovie?.genres?.map((item, index, arr) => (
                  <Styled.Text size={16} weight={500} key={item?.id}>
                    {item.name}
                    {arr[arr.length - 1] ? '. ' : ''}
                  </Styled.Text>
                ))}
              </View>
              <Styled.RedButton mt={5} width={100} height={35}>
                <Styled.Text size={16} weight={600} color="white">
                  View{' '}
                  <FontAwesomeIcon
                    color="#fff"
                    name="long-arrow-right"
                    size={18}
                  />
                </Styled.Text>
              </Styled.RedButton>
            </View>
          </ImageBackground>
        </View>
        <Styled.Container>
          <Styled.Title weight={500} size={20} mt={25}>
            Top 20 TV Shows This Week
          </Styled.Title>
          <ScrollView
            horizontal={true}
            style={{
              marginVertical: 25,
            }}>
            {state?.tv?.map(item => (
              <TouchableOpacity
                onPress={() => navigation.navigate('MovieDetails')}
                style={{marginRight: 15, width: 180}}>
                <Image
                  source={{uri: configs.IMG_URL + item?.poster_path}}
                  style={{width: 180, height: 250, borderRadius: 22}}
                />
                <Styled.RedButton
                  mt={5}
                  width={45}
                  height={35}
                  borderRadius="8"
                  bgColor={
                    item?.vote_average >= 7
                      ? '#33a908'
                      : item?.vote_average >= 4
                      ? '#f77f16'
                      : null
                  }
                  style={{position: 'absolute', top: 5, left: 10}}>
                  <Styled.Text size={14} weight={600} color="white">
                    {item?.vote_average.toString().length == 5
                      ? item?.vote_average.toString().slice(0, 1) + '.0'
                      : item?.vote_average.toString()}
                  </Styled.Text>
                </Styled.RedButton>
                <Styled.Title weight={500} size={20} mt={10} ml={5}>
                  {item?.name}
                </Styled.Title>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Styled.Title weight={500} size={20}>
            Top 20 Movies This Week
          </Styled.Title>
          <ScrollView
            horizontal={true}
            style={{
              marginVertical: 25,
              height: 390,
            }}>
            {state?.week?.map(item => (
              <TouchableOpacity
                key={item?.id}
                onPress={() =>
                  navigation.navigate('MovieDetails', {id: item?.id})
                }
                style={{marginRight: 15, width: 180}}>
                <Image
                  source={{uri: configs.IMG_URL + item?.poster_path}}
                  style={{width: 180, height: 250, borderRadius: 22}}
                />
                <Styled.RedButton
                  mt={5}
                  width={45}
                  height={35}
                  borderRadius="8"
                  bgColor={
                    item?.vote_average >= 7
                      ? '#33a908'
                      : item?.vote_average >= 4
                      ? '#f77f16'
                      : item?.vote_average <= 3
                      ? '#000'
                      : null
                  }
                  style={{position: 'absolute', top: 5, left: 10}}>
                  <Styled.Text size={14} weight={600} color="white">
                    {item?.vote_average?.toString().length == 5
                      ? item?.vote_average?.toString().slice(0, 3)
                      : item?.vote_average?.toString()}
                  </Styled.Text>
                </Styled.RedButton>
                <Styled.Title weight={500} size={20} mt={10} ml={5}>
                  {item?.title}
                </Styled.Title>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Styled.Container>
      </ScrollView>
    </Styled.SafeAreaView>
  );
};

export default Home;
