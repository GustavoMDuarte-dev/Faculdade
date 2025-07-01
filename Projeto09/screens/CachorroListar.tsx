import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { Database } from './database/Database';
import { Cachorro } from '../model/Cachorro';
import estilo from '../estilo';
import React, { useEffect, useState } from 'react';
import { CachorroService } from '../database/CachorroService';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function CachorroListar () {
    const[dados, setDados] = useState({});
    const[loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useFocusEffect( 
        React.useCallback(() => {
            Carregar();
        }, [])
    )

    const Carregar = async() => {
        try {
            const resultado = await CachorroService.findAll();
            //console.log(resultado);
            setDados(resultado);
            setLoading(false);
        } catch {

        }        
    }

    const excluir = (cachorro: Cachorro) => {
        Alert.alert(
            "Excluir registro?",
            `Deseja excluir o cachorro ${cachorro.nome}?`,
            [
                {
                    text: "Excluir",
                    onPress: () => {
                        const resultado = CachorroService.delete(cachorro);
                        Carregar();
                    }
                },
                {
                    text: "Cancelar"
                }
            ]
        )
    }

    const editar = (item: Cachorro) => {
        navigation.navigate("Cachorro Manter", {cachorro: item})
    }


    const criaItem = ({item} : {item: Cachorro}) => 
        <TouchableOpacity style={{marginTop: 10}}
            onPress={() => editar(item)}
            onLongPress={() => excluir(item)}
        >
            <Text>ID: {item.id}</Text>
            <Text>Nome: {item.nome}</Text>
            <Text>Raça: {item.raca}</Text>
            <Text>Pelagem: {item.pelagem}</Text>
            <Text>Data Nasc: {item.datanasc}</Text>
        </TouchableOpacity>


    return (
        <View>
            <FlatList 
                data={dados}
                renderItem={criaItem}
                keyExtractor={item => item.id}
                onRefresh={() => Carregar()}
                refreshing={loading}
            />
        </View>
    )


}
