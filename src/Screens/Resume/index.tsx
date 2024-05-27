import AsyncStorage from '@react-native-async-storage/async-storage';
import React , { useState, useCallback }from 'react';
import { ActivityIndicator } from 'react-native';

import { useAuth } from '../../Hooks/auth';
import { useFocusEffect } from '@react-navigation/core'; 
import { RFValue } from 'react-native-responsive-fontsize';
import { VictoryPie } from 'victory-native';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { HistoryCard } from '../../Components/HistoryCard';
import { categories } from '../../Util/categories';

import {
    Container,
    Header, 
    Title,
    ChartContainer,
    Content,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadingContainer
} from './styles';
import { locale } from 'yargs';

interface TransactionsProps {
    id: string,
    type: 'positive' | 'negative',
    name: string,
    amount: string,
    category: string,
    date: string
}

interface CategoriesProps{
    key: string,
    name: string,
    total: number,
    totalFormatted: string,
    color: string,
    percentage: string
}

export function Resume(){
    const [isLoading, setIsLoading] = useState(false);
    const [totalByCategories, setTotalByCategories] = useState<CategoriesProps[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const theme = useTheme();

    function handleUpdateDate(type: 'next' | 'prev'){
        if(type === 'next'){
            setSelectedDate(addMonths(selectedDate,1));
        }else{
            setSelectedDate(subMonths(selectedDate,1));
        }
    }

    async function loadCategories(){
        setIsLoading(true);
        const { user } = useAuth();
        const dataKey = `@gofinances:transactions_user:${user.id}`;

        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];

        const expensives = currentData.filter((item : TransactionsProps) => 
            item.type === 'negative' &&
            new Date(item.date).getMonth() === selectedDate.getMonth() &&
            new Date(item.date).getFullYear() === selectedDate.getFullYear()
        );
        
        const expensivesTotais = expensives.reduce((accumulator: number,expensive: TransactionsProps) => {
            return accumulator + Number(expensive.amount)
        },0) ;
        const totalByCategory : CategoriesProps[] = [];

        categories.forEach((category) => {
            let totalCategorySum = 0;

            expensives.forEach((transaction : TransactionsProps) => {
                if(transaction.category === category.key){
                    totalCategorySum += Number(transaction.amount);
                }
            });
            
            const totalPercentage = (totalCategorySum  / expensivesTotais * 100).toFixed(0);
            if(totalCategorySum > 0){
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: totalCategorySum,
                    totalFormatted: totalCategorySum.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2
                    }),
                    color: category.color,
                    percentage: `${totalPercentage}%`
                });
            }
        });
        setTotalByCategories(totalByCategory);
        setIsLoading(false)
    }

    useFocusEffect(useCallback(()=>{
        loadCategories();
    },[selectedDate]))

    return(
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {
            isLoading ? 
                <LoadingContainer>
                    <ActivityIndicator color={theme.colors.primary} size="large"/>
                </LoadingContainer>
            :
                <Content 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight()
                    }}
                >
                    <MonthSelect>
                        <MonthSelectButton onPress={() => handleUpdateDate('prev')}>
                            <MonthSelectIcon name='chevron-left'/>
                        </MonthSelectButton>
                        <Month>{ format(selectedDate, 'MMMM, yyyy', {locale: ptBR}) }</Month>
                        <MonthSelectButton onPress={() => handleUpdateDate('next')}>
                            <MonthSelectIcon name='chevron-right'/>
                        </MonthSelectButton>
                    </MonthSelect>
                    <ChartContainer>
                        <VictoryPie
                            data={totalByCategories}
                            x='percentage'
                            y='total'
                            colorScale={totalByCategories.map(item => item.color)}
                            style={{
                                labels:{
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape
                                }
                            }}
                            labelRadius={60}
                        />
                    </ChartContainer>
                    {totalByCategories.map((item : CategoriesProps)=>(
                        <HistoryCard
                            key={item.key}
                            name={item.name}
                            amount={item.totalFormatted}
                            color={item.color}
                        />))
                        
                    }
                </Content>
            }
        </Container>
    );
}