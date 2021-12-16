import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components/native';

import { getCity, selectWeather } from '../../store/Weather.store';
import { Header } from '../../components';

const StyledContainer = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.color.gray.secondary}
    padding: 16px;
  `}
`;

const StyledResultItem = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.color.white}
    height: 130px;
    padding: 16px;
    border-width: 1px;
    border-radius: 2px;
    border-color: ${theme.color.gray.tertiary};
    shadow-color: ${theme.color.black};
    shadow-offset: { width: 0px, height: 2px };
    shadow-opacity: 0.8px;
    shadow-radius: 2px;
    elevation: 1px;
  `}
`;

const StyledCity = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.typography.weight.regular};
    font-size: ${theme.typography.size.city};
    color: ${theme.color.black};
  `}
`;

const StyledCountry = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.typography.weight.regular};
    font-size: ${theme.typography.size.h4};
    color: ${theme.color.black};
    margin-top: 2px;
  `}
`;

const StyledButtonTitle = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.typography.weight.medium};
    font-size: ${theme.typography.size.h4};
    color: ${theme.color.blue};
    margin-top: 31px;
  `}
`;

const Button = styled.TouchableOpacity``;

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const { city, isFetching } = useSelector(selectWeather);

  return (
    <>
      <Header
        status='search'
        value={value}
        onChangeText={text => setValue(text)}
        onSubmitEditing={() => dispatch(getCity({ city: value }))}
      />
      <StyledContainer>
        {city && !isFetching &&
          <StyledResultItem>
            <StyledCity>{city.name}</StyledCity>
            <StyledCountry>Brasil</StyledCountry>
            <Button>
              <StyledButtonTitle>ADICIONAR</StyledButtonTitle>
            </Button>
          </StyledResultItem>
        }
        {isFetching && <ActivityIndicator size="large" />}
      </StyledContainer>
    </>
  );
};

export default Search;
