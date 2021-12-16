import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

import { getCurrentWeather } from '../../services/api';

type City = {
  id: number;
  name: string
}

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

const StyledDetails = styled.View`

`;

const CityItem: React.ElementType<CityItemProps> = ({ city }: CityItemProps) => {
  const navigation = useNavigation();
  const [currentWeather, setCurrentWeather] = useState('');
  const [description, setDescription] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const getWeather = async () => {
    const weather = await getCurrentWeather(city.name);

    setMin(weather.main.temp_min - 273.15);
    setMax(weather.main.temp_max - 273.15);
    setDescription(weather.weather[0].description);
    setCurrentWeather((weather.main.temp - 273.15).toFixed(0));
  }

  useEffect(() => {
    getWeather();
  }, [])

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledDetails>
          <StyledCity>{city.name}</StyledCity>
          <StyledCountry>Brasil</StyledCountry>
        </StyledDetails>
        <StyledTemperature>{currentWeather}º</StyledTemperature>
      </StyledHeader>
      <StyledDetails>
          <StyledDescription>{description}</StyledDescription>
          <StyledTemperatures>{min.toFixed(0)}º - {max.toFixed(0)}º</StyledTemperatures>
        </StyledDetails>
    </StyledContainer>
  );
};

export default CityItem;
