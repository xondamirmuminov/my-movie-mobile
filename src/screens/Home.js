import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Button} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Styled from '../styles';
import {sendQuery} from '../utils/axios';
import Urls from '../utils/urls';
import configs from '../configs';

const Home = () => {
  const [trendingMovie, setTrendingMovie] = useState({});
  const [trending, setTrending] = useState([]);

  const fetchTrendingMovie = async () => {
    const data = await sendQuery(Urls.TRENDING);
    if (data) {
      setTrending([...data?.results]);
      fetchTrendingMovieDetails();
    }
  };

  const fetchTrendingMovieDetails = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${trending[0].id}?api_key=${configs.API_KEY}`,
    );
    setTrendingMovie(data);
  };

  useEffect(() => {
    fetchTrendingMovie();
  }, []);

  return (
    <Styled.SafeAreaView>
      <View
        style={{
          height: 350,
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
            }}>
            <Styled.Title>{trending[0]?.title}</Styled.Title>
            <View style={{flexDirection: 'row'}}>
              {trendingMovie?.genres?.map((item, index, arr) => (
                <Styled.Text size={16} weight={500} key={item?.id}>
                  {item.name}
                  {arr[arr.length - 1] ? '. ' : ''}
                </Styled.Text>
              ))}
            </View>
            <Styled.RedButton width={100} height={35}>
              <Styled.Text size={16} weight={500} color="white">
                View
              </Styled.Text>
            </Styled.RedButton>
          </View>
        </ImageBackground>
      </View>
      <Styled.Container>
        <Styled.Title>Home</Styled.Title>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Home;
