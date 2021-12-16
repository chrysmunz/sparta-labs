import React from 'react';
import styled, { css } from 'styled-components/native';

import { Header } from '../../components';

const StyledContainer = styled.View`
  ${({ theme }) => css`
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

const Home: React.FC = () => {
  return (
    <>
      <Header/>
      <StyledContainer>
        <StyledEmptyTitle>Parece que você ainda não adicionou uma cidade</StyledEmptyTitle>
        <StyledEmptySubtitle>Tente adicionar uma cidade usando o botão de busca</StyledEmptySubtitle>
      </StyledContainer>
    </>
  );
};

export default Home;
