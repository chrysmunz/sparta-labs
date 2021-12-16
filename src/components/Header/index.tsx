import React from 'react';
import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { theme as currentTheme } from '../../styles/theme';

type Status = 'default' | 'search';
interface HeaderProps {
  status?: Status;
}

const StyledContainer = styled.View<HeaderProps>`
  ${({ theme, status }) => css`
    background-color: ${theme.color.blue};
    width: 100%;
    height: 56px;
    padding: 17px;
    align-items: center;
    justify-content: ${status === 'default' ? 'space-between' : 'flex-start'};
    flex-direction: row;
  `}
`;

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: '#00FFFFFF' 
})`
  ${({ theme }) => css`
    width: 256px;
    height: 56px;
    font-size: ${theme.typography.size.h3};
    font-weight: ${theme.typography.weight.regular};
    color: ${theme.color.white};
    margin-left: 21px;
  `}
`;

const StyledTitle = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.typography.weight.medium};
    font-size: ${theme.typography.size.title};
    color: ${theme.color.white};
  `}
`;

const Button = styled.TouchableOpacity``;

const Header: React.ElementType<HeaderProps> = ({ status }: HeaderProps) => {
  return (
    <StyledContainer status={status}>
      {status === 'default' ?
        <>
          <StyledTitle>Cidades</StyledTitle>
          <Button>
            <Icon name='search' color={currentTheme.color.white} size={17.5} />
          </Button>
        </> :
        <>
          <Button>
            <Icon name='times' color={currentTheme.color.white} size={17.5} />
          </Button>
          <StyledInput placeholder='Digite o nome da cidade' />
        </>
      }
    </StyledContainer>
  );
};

Header.defaultProps = {
  status: 'default'
};

export default Header;
