import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setCities, selectCities } from '../../store/Cities.store';
import { CityItem, Header } from '../../components';

const StyledContainer = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.color.gray.secondary}
    padding-horizontal: 16px;
  `}
`;

const StyledEmptyTitle = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.typography.weight.medium};
    font-size: ${theme.typography.size.title};
    text-align: center;
    margin-top: 62px;
    color: ${theme.color.black};
  `}
`;

const StyledEmptySubtitle = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.typography.weight.regular};
    font-size: ${theme.typography.size.h3};
    text-align: center;
    margin-top: 16px;
    color: ${theme.color.gray.primary};
  `}
`;

export const FlatList = styled.FlatList`
  margin-top: 16px;
`;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { cities } = useSelector(selectCities);

  const getCities = async () => {
    const storage = await AsyncStorage.getItem('@cities');

    if (storage) {
      dispatch(setCities(JSON.parse(storage)));
    }
  };

  useEffect(() => {
    getCities();
  }, [])

  return (
    <>
      <Header />
      <StyledContainer>
        {cities.length === 0 ?
          <>
            <StyledEmptyTitle>Parece que você ainda não adicionou uma cidade</StyledEmptyTitle>
            <StyledEmptySubtitle>Tente adicionar uma cidade usando o botão de busca</StyledEmptySubtitle>
          </> :
          <FlatList
            data={cities}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <CityItem city={item} />
            )}
          />
        }
      </StyledContainer>
    </>
  );
};

export default Home;
