import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import {
    Button,
    LogoWrapper,
    Title, 
} from './styles';

interface Props extends RectButtonProps{
    title: string,
    svg: React.FC<SvgProps>
}

export function ButtonSignIn({title, svg: Svg, ...rest}: Props){
    return(
        <Button {...rest}>
            <LogoWrapper>
                <Svg
                    width={24}
                    height={24}
                />
            </LogoWrapper>
            <Title>{title}</Title>
        </Button>
    );
}