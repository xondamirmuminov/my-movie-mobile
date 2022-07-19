import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {useEffect, useState} from 'react';
import Styled from '../styles';
import {sendQuery} from '../utils/axios';
import Urls from '../utils/urls';
import configs from '../configs';

const Home = () => {
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);

  const fetchPopularMovie = async () => {
    const data = await sendQuery(Urls.POPULAR_MOVIES);
    setPopular([...data?.results]);
  };

  const fetchTrendingMovie = async () => {
    const data = await sendQuery(Urls.TRENDING);
    setTrending([...data?.results]);
  };

  useEffect(() => {
    fetchPopularMovie();
    fetchTrendingMovie();
  }, []);

  return (
    <Styled.SafeAreaView>
      <ImageBackground
        source={{
          uri:
            configs.IMG_URL +
            (trending[0]?.backdrop_path ?? trending[0]?.poster_path),
        }}
        resizeMode="cover">
        <Styled.Title>Home</Styled.Title>
        <Styled.Title>Home</Styled.Title>
        <Styled.Title>Home</Styled.Title>
        <Styled.Title>Home</Styled.Title>
        <Styled.Title>Home</Styled.Title>
        <Styled.Title>Home</Styled.Title>
        <Styled.Title>Home</Styled.Title>
        <Styled.Title>Home</Styled.Title>
        <Styled.Title>Home</Styled.Title>
        <Styled.Title>Home</Styled.Title>
      </ImageBackground>
      <Styled.Container>
        <Styled.Title>Home</Styled.Title>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Home;
