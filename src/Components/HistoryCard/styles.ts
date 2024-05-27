import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContentProps {
    color: string
}

export const Container = styled.View<ContentProps>`
    width: 100%;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 13px 24px;

    border-left-width: 5px;
    border-left-color: ${({color}) => color};
    margin-bottom: 8px;
`;

export const Title = styled.Text`
    font-family:  ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;
    color:  ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.View`
    flex-direction: row;
`;

export const Dollar = styled.Text`
    font-family:  ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(15)}px;
    color:  ${({ theme }) => theme.colors.title};
`;

export const Value = styled.Text`
    font-family:  ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
    color:  ${({ theme }) => theme.colors.title};
`;

