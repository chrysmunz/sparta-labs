import React from 'react';
import { TextInputProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { theme as currentTheme } from '../../styles/theme';

type Status = 'default' | 'search';
interface HeaderProps extends TextInputProps {
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

const Header: React.ElementType<HeaderProps> = ({
  status,
  value,
  onChangeText,
  onSubmitEditing
}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <StyledContainer status={status}>
      {status === 'default' ?
        <>
          <StyledTitle>Cidades</StyledTitle>
          <Button onPress={() => navigation.navigate('Search')}>
            <Icon name='search' color={currentTheme.color.white} size={17.5} />
          </Button>
        </> :
        <>
          <Button onPress={() => navigation.navigate('Home')}>
            <Icon name='times' color={currentTheme.color.white} size={17.5} />
          </Button>
          <StyledInput
            value={value}
            placeholder='Digite o nome da cidade'
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
        </>
      }
    </StyledContainer>
  );
};

Header.defaultProps = {
  status: 'default'
};

export default Header;
