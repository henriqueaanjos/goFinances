import React from 'react';

import {
    Container,
    Title,
    Amount,
    Dollar,
    Value
} from './styles';

interface Props {
    name: string,
    amount: string, 
    color: string
}

export function HistoryCard({name, amount, color} : Props){
    return(
        <Container color={color}>
            <Title>{name}</Title>
            <Amount>
                <Dollar>R$</Dollar>
                <Value>{amount}</Value>
            </Amount>
        </Container>
    );
}