import React, { useState } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { 
    Container,
    Title,
    Icon,
    Button
 } from './styles';

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props extends RectButtonProps{
    type: 'up' | 'down',
    title: string,
    isActive: boolean
}

export function TrasactionTypeButton({type, title, isActive, ...rest}: Props){

    return(
        <Container
            type={type}
            isActive={isActive}
        >
            <Button
                {...rest}
            >
                <Icon 
                    name={icons[type]} 
                    type={type}
                />
                <Title>{title}</Title>
            </Button>
        </Container>
    );
}