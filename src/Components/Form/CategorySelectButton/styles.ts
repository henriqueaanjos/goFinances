import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton }  from 'react-native-gesture-handler';

interface TitleProps{
    title: string,
}

export const Container = styled(RectButton)`
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    width: 100%;
    padding: 18px 16px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Category = styled.Text<TitleProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({title, theme}) => title === 'Categoria' ? theme.colors.text : theme.colors.title}
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.text};
`;
