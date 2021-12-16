import React from 'react';
import styled, { css } from 'styled-components/native';

import { Header } from '../../components';

const StyledContainer = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.color.gray.secondary}
    padding-horizontal: 16px;
  `}
`;

const Search: React.FC = () => {
  return (
    <>
      <Header status='search'/>
      <StyledContainer>
      </StyledContainer>
    </>
  );
};

export default Search;
