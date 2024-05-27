import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
`;


export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color:  ${({ theme }) => theme.colors.primary} ;
    align-items: center;
    justify-content: flex-end;
`;

export const TitleWrapper = styled.View`
    align-items: center;
`;

export const Title = styled.Text`
    margin-top: 40px;
    font-family:  ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(30)}px;
    color:  ${({ theme }) => theme.colors.shape};
    text-align: center;
`;

export const SignInTitle = styled.Text`
    margin-top: 80px;
    margin-bottom: 67px;
    text-align: center;
    color:  ${({ theme }) => theme.colors.shape};
    font-family:  ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;

export const Footer = styled.View`
    width: 100%;
    height: 30%;
    background-color:  ${({ theme }) => theme.colors.secundary};
`;

export const FooterWrapper = styled.View`
    padding: 0px 32px;
    margin-top: ${RFPercentage(-4)}px;

    justify-content: space-between;
`;
