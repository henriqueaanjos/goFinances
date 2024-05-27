import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { HighLightCard } from '../../Components/HighlightCard';
import { TransactionCard , TransactionCardProps} from '../../Components/TrasactionCard';

import { useTheme } from 'styled-components';

import { useAuth } from '../../Hooks/auth';

import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGretings,
  UserName,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadingContainer
} from './styles';

interface HighLightProps{
  amount: string,
  lastTransactionDate: string
}

interface HighLightData{
  entriesTotal: HighLightProps,
  expensivesTotal: HighLightProps,
  total: HighLightProps
}


export interface DataListProps extends TransactionCardProps{
  id: string,
}

export const DashBoard = () => {
  const [data, setData] = useState<DataListProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

  const theme = useTheme();
  const { user, signOut} = useAuth();
  const dataKey = `@gofinances:transactions_user:${user.id}`;

  function getLastTransactionsDate(collection : DataListProps[], type: 'positive' | 'negative'| 'total'){
    if(type === 'total'){
      const lastTransactionDate = new Date(
        Math.max.apply(Math,
        collection.map(item => new Date(item.date).getTime())
      ));
      if(lastTransactionDate.getDate()){
        return `01 à ${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString('pt-BR',{month: 'long'})}`;
      }else{
        return 'Nenhuma Transação Cadastrada!';
      }
    }else{
      const lastTransactionDate = new Date(
        Math.max.apply(Math,
        collection.filter(item => item.type === type)
        .map(item => new Date(item.date).getTime())
      ));
      if(lastTransactionDate.getDate()){
        return `${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString('pt-BR',{month: 'long'})}`;
      }else{
        return type ==='positive' ? 'Nenhuma Entrada Cadastrada!' : 'Nenhuma Saída Cadastrada!';
      }
    }
  }

  async function getTransactions(){
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const formattedTransactions : DataListProps[] = transactions.map((item: DataListProps) =>{

      if(item.type === 'positive'){
        entriesTotal += Number(item.amount);
      }else{
        expensivesTotal += Number(item.amount);
      }


      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      const date = Intl.DateTimeFormat('pt-BR',{
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      };
    });

    const total = entriesTotal - expensivesTotal;
    const lastDateEntries = getLastTransactionsDate(transactions, 'positive');
    const lastDateExpensives = getLastTransactionsDate(transactions, 'negative');
    const lastDateTotal = getLastTransactionsDate(transactions, 'total');


    setHighLightData({
      entriesTotal:{
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactionDate: lastDateEntries,
      },
      expensivesTotal:{
        amount: expensivesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactionDate: lastDateExpensives,
      },
      total:{
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactionDate: lastDateTotal
      }
    });

    setData(formattedTransactions);
    setIsLoading(false);
  }
  async function handleSignOut(){
    await signOut();
  }
  async function handleDeleteAll(){
    await AsyncStorage.removeItem(dataKey);
  }
  useEffect(()=> {
    getTransactions();
  },[]);

  useFocusEffect(useCallback(()=>{
      getTransactions();
      //handleDeleteAll();
  },[]))
  return (
    <Container>
      {
        isLoading ? 
          <LoadingContainer>
            <ActivityIndicator color={theme.colors.primary} size="large"/>
          </LoadingContainer>
        :<>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{ uri: user.photo}}
                />
                <User>
                  <UserGretings>
                      Olá
                  </UserGretings>
                  <UserName>
                    {user.name}
                  </UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={handleSignOut}>
                <Icon name="power"/>
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighLightCards>
            <HighLightCard
              type='up'
              title='Entrada'
              amount={highLightData.entriesTotal.amount}
              lastTransaction={highLightData.entriesTotal.lastTransactionDate}
            />
            <HighLightCard
              type='down'
              title='Saída'
              amount={highLightData.expensivesTotal.amount}
              lastTransaction={highLightData.expensivesTotal.lastTransactionDate}
            />
            <HighLightCard
              type='total'
              title='Total'
              amount={highLightData.total.amount}
              lastTransaction={highLightData.total.lastTransactionDate}
            />
          </HighLightCards>
          <Transactions>
            <Title>Listagem</Title>
              <TransactionList 
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <TransactionCard data={item}/>}
              />
              
          </Transactions>
        </>
      }
    </Container>
  );
}