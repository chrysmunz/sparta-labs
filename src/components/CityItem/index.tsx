import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

import { getCurrentWeather } from '../../services/api';
import { City } from '../../@types';

interface CityItemProps extends TouchableOpacity {
  city: City;
}

const StyledContainer = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${theme.color.white}
    height: 130px;
    padding: 16px;
    border-width: 1px;
    border-radius: 2px;
    border-color: ${theme.color.gray.tertiary};
    shadow-color: ${theme.color.black};
    shadow-opacity: 0.8;
    shadow-radius: 2px;
    elevation: 1;
    margin-bottom: 16px;
  `}
`;

const StyledHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const StyledTemperature = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.typography.weight.regular};
    font-size: ${theme.typography.size.temperature};
    color: ${theme.color.orange};
  `}
`;

const StyledTemperatures = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.typography.weight.regular};
    font-size: ${theme.typography.size.h5};
    color: ${theme.color.black};
    margin-top: 2px;
  `}
`;

const StyledDescription = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.typography.weight.regular};
    font-size: ${theme.typography.size.h4};
    color: ${theme.color.orange};
    margin-top: 13px;
  `}
`;

const StyledDetails = styled.View``;

const CityItem: React.ElementType<CityItemProps> = ({ city }: CityItemProps) => {
  const navigation = useNavigation();
  const [data, setData] = useState({ daily: [], current: { temp: 0, weather: { description: '' } } });
  const [loading, setLoading] = useState(true);

  const getWeather = async () => {
    setLoading(true);
    const weather = await getCurrentWeather({ lat: city.lat, lon: city.lon });
    setData(weather);
    setLoading(false);
  }

  useEffect(() => {
    getWeather();
  }, [])

  return (
    <StyledContainer onPress={() => navigation.navigate('Details', { data, city })}>
      <StyledHeader>
        <StyledDetails>
          <StyledCity>{city.name}</StyledCity>
          <StyledCountry>Brasil</StyledCountry>
        </StyledDetails>
        <StyledTemperature>{!loading ? `${data.current.temp.toFixed(0)}º` : null}</StyledTemperature>
      </StyledHeader>
      <StyledDetails>
          <StyledDescription>{!loading ? data.current.weather[0].description : null}</StyledDescription>
          <StyledTemperatures>
            {!loading ? `${data.daily[0].temp.min.toFixed(0)}º - ${data.daily[0].temp.max.toFixed(0)}º` : null}
          </StyledTemperatures>
        </StyledDetails>
    </StyledContainer>
  );
};

export default CityItem;
