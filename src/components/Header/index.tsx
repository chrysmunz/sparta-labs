import React from 'react';
import { TextInputProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { theme as currentTheme } from '../../styles/theme';

type Status = 'default' | 'search' | 'details';
interface HeaderProps extends TextInputProps {
  status?: Status;
  title?: string;
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
  ${({ theme, status }) => css`
    font-weight: ${theme.typography.weight.medium};
    font-size: ${theme.typography.size.title};
    color: ${theme.color.white};
    text-align: center;
    margin-left: ${status === 'details' ? '40px' : '0px'}
  `}
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
`;

const Header: React.ElementType<HeaderProps> = ({
  title,
  value,
  status,
  onChangeText,
  onSubmitEditing
}: HeaderProps) => {
  const navigation = useNavigation();

  if (status === 'default') {
    return (
      <StyledContainer status={status}>
        <StyledTitle>Cidades</StyledTitle>
        <Button onPress={() => navigation.navigate('Search')}>
          <Icon name='plus' color={currentTheme.color.white} size={20} />
        </Button>
      </StyledContainer>
    );
  }

  if (status === 'search') {
    return (
      <StyledContainer>
        <Button onPress={() => navigation.goBack()}>
          <Icon name='chevron-left' color={currentTheme.color.white} size={20} />
        </Button>
        <StyledInput
          value={value}
          placeholder='Digite o nome da cidade'
          autoCapitalize='words'
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      </StyledContainer>
    );
  }

  if (status === 'details') {
    return (
      <StyledContainer>
      <Button onPress={() => navigation.goBack()}>
        <Icon name='chevron-left' color={currentTheme.color.white} size={20} />
      </Button>
      <StyledTitle status={status}>{title}</StyledTitle>
    </StyledContainer>
    );
  }
};

Header.defaultProps = {
  status: 'default'
};

export default Header;
