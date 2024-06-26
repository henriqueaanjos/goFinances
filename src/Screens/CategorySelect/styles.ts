import styled, {css} from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


interface CategoryProps{
    isActive: boolean,
}

export const Container = styled(GestureHandlerRootView)`
    flex:1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View `
    background-color: ${({theme}) => theme.colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text `
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
`;


export const Category = styled.TouchableOpacity<CategoryProps>`
    width: 100%;
    flex-direction: row;
    padding: ${RFValue(15)}px;
    align-items: center;

    ${({isActive}) => isActive && css`
        background-color: ${({theme}) => theme.colors.secundary_light};
    `} ;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
`;

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const CategorySeparator = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({theme}) => theme.colors.text};
`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;
