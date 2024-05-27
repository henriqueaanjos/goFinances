import React, { useState } from 'react';
import { Alert, Modal } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Hooks/auth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { InputForm } from '../../Components/Form/InputForm';
import { TrasactionTypeButton } from '../../Components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../Components/Form/CategorySelectButton';
import { Button } from '../../Components/Form/Button';

import { CategorySelect } from '../CategorySelect';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypeButtons
} from './styles';


interface Category{
    key: string,
    name: string
}

interface FormData{
    name: string,
    amount: string,
}
const Schema = Yup.object().shape({
    name: Yup.string().required('O Nome é Obrigatório!'),
    amount: Yup.number().typeError('O Valor precisa ser númerico!').positive('O Valor não pode ser negativo!')
});
export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })

    const {control, handleSubmit, formState: { errors }, reset} = useForm({resolver: yupResolver(Schema)});

    const navigation = useNavigation();
    const { user } = useAuth();
    
    function handleTransactionSelected(type: 'positive' | 'negative'){
        setTransactionType(type);
    }
    function handelOpenCategoryModal(){
        setIsVisibleModal(true);
    }
    function handleCloseCategoryModal(){
        setIsVisibleModal(false);
    }
    function handleSelectCategory(category: Category){
        setCategory(category);
    }

    async function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('O Tipo de Transação é Obrigatório!');
        
        if(category.key === 'category')
            return Alert.alert('A Categoria é Obrigatória!');

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        };
        try{
            const dataKey = `@gofinances:transactions_user:${user.id}`;

            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFormated = [
                ...currentData,
                newTransaction
            ];
            
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });
            navigation.navigate('Listagem');
        }catch(error){
            console.log(error);
            Alert.alert('Não foi Possível salvar a Transação, Tente Novamente');
        }
    }
    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm
                        control={control}
                        name="name"
                        placeholder='Nome'
                        autoCapitalize='sentences'
                        autoCorrect={false}
                        error = {errors.name && errors.name.message}
                    />
                    <InputForm
                        control={control}
                        name="amount"
                        placeholder='Preço'
                        keyboardType='numeric'
                        error = {errors.amount && errors.amount.message}
                    />
                    <TransactionTypeButtons>
                        <TrasactionTypeButton
                            type='up'
                            title='Income'
                            onPress={() => handleTransactionSelected('positive')}
                            isActive={transactionType === 'positive'}
                        />
                        <TrasactionTypeButton
                            type='down'
                            title='Outcome'
                            onPress={() => handleTransactionSelected('negative')}
                            isActive={transactionType === 'negative'}
                        />
                    </TransactionTypeButtons>
                    <CategorySelectButton 
                        title={category.name}
                        onPress={handelOpenCategoryModal}
                    />
                </Fields>
                <Button
                    title='Enviar'
                    onPress={handleSubmit(handleRegister)}
                />
            </Form>
            <Modal visible={isVisibleModal}>
                <CategorySelect
                    category={category}
                    setCategory={handleSelectCategory}
                    closeCategoryModal={handleCloseCategoryModal}
                />
            </Modal>
        </Container>
    );

}