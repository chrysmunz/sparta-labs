import React from 'react';
import { useRoute } from '@react-navigation/native';
import styled, { css } from 'styled-components/native';

import { Header } from '../../components';
import { getNameDay, getDayMonth } from '../../utils/date';

const StyledContainer = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.color.gray.secondary}
    padding: 16px;
  `}
`;

export const FlatList = styled.FlatList`
  margin-top: 16px;
`;

const StyledItem = styled.View`
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

const Details: React.FC = () => {
  const routes = useRoute();
  const { data, city } = routes.params;

  return (
    <>
      <Header status='details' title={city.name} id={city.id} />
      <StyledContainer>
        <FlatList
          data={data.daily}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <StyledItem>
              <StyledHeader>
                <StyledDetails>
                  <StyledCity>{getNameDay(index)}</StyledCity>
                  <StyledCountry>{getDayMonth(index)}</StyledCountry>
                </StyledDetails>
                <StyledTemperature>{item.temp.day.toFixed(0)}º</StyledTemperature>
              </StyledHeader>
              <StyledDetails>
                <StyledDescription>{item.weather[0].description}</StyledDescription>
                <StyledTemperatures>
                  {item.temp.min.toFixed(0)}º - {item.temp.max.toFixed(0)}º
                </StyledTemperatures>
              </StyledDetails>
            </StyledItem>
          )}
        />
      </StyledContainer>
    </>
  );
};

export default Details;
