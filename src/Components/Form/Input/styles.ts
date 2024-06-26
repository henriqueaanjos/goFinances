import styled from 'styled-components/native';

import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    width: 100%;
    padding: 18px 16px;

    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    margin-bottom: 8px;
`;