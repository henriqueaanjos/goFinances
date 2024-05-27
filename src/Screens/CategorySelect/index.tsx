import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../Components/Form/Button';

import { categories } from '../../Util/categories';

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    CategorySeparator,
    Footer,
} from './styles';

interface Category{
    key: string,
    name: string
}

interface Props {
    category: Category,
    setCategory: (category: Category) => void,
    closeCategoryModal: () => void
}

export function CategorySelect({category, setCategory, closeCategoryModal}: Props){

    function handleCloseCategoryModal(){
        closeCategoryModal();
    }
    
    function handleSelectCategory(category: Category){
        setCategory(category);
    }

    return(
        <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>

            <FlatList
                data={categories}
                keyExtractor={(item)=> item.key}
                renderItem={({item}) => (
                    <Category
                        isActive={category.key == item.key}
                        onPress={() => handleSelectCategory(item)}
                    >
                        <Icon name={item.icon}/>
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <CategorySeparator/>}
            />
            <Footer>
                <Button
                    title="Selecionar"
                    onPress={handleCloseCategoryModal}
                />
            </Footer>
        </Container>
    );
}