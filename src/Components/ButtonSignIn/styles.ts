import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';


export const Button = styled(RectButton)`
    width:100%;
    flex-direction: row;
    height: 56px;
    background-color:  ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    margin-bottom: 16px;

    align-items: center;
`;

export const LogoWrapper = styled.View`
    height: 100%;
    padding: ${RFValue(16)}px;
    align-items: center;
    justify-content: center;
    border-color:  ${({ theme }) => theme.colors.background};
    border-right-width: 1px;
`;
export const Title = styled.Text`
    font-family:  ${({ theme }) => theme.fonts.medium};
    color:  ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(14)}px;

    flex:1 ;
    text-align: center;
`;
