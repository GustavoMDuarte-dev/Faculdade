import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Database } from './database/Database';
import { Cachorro } from '../model/Cachorro';
import estilo from '../estilo';
import React, { useState, useEffect } from 'react';
import { CachorroService } from '../database/CachorroService';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function CachorroManter () {
    const[formCachorro, setFormCachorro] = useState<Partial<Cachorro>>({});
    const navigation = useNavigation();
    const[botao, setBotao] = useState("Salvar");

    const route = useRoute();        
    
    useEffect(() => {
        if (route.params && route.params.cachorro) {
            setFormCachorro(route.params.cachorro);
            formCachorro.id = route.params.cachorro.id;
            setBotao("Atualizar");
        }
    }, [route.params]);  

    const Limpar = () => {        
        setFormCachorro({});
        setBotao("Salvar");
    }

    const Salvar = async() => {
        if (formCachorro.id) {
            const updCachorro = new Cachorro(formCachorro);
            const resultado = await CachorroService.update(updCachorro);
            alert("Cachorro ID: " + updCachorro.id + " atualizado com sucesso!")
            Limpar();
        } else {
            const novoCachorro = new Cachorro(formCachorro);
            const resultado = await CachorroService.create(novoCachorro);
            alert("Cachorro ID: " + novoCachorro.id + " cadastrado com sucesso!")
            Limpar();
        }
        
    }

    return (
        <View style={estilo.container} >
            <Text style={estilo.titulo}>CADASTRO DE CACHORROS</Text>

            <TextInput
                style={estilo.input}
                placeholder='Nome do cachorro'
                onChangeText={ (valor) => setFormCachorro({
                    ...formCachorro, nome: valor
                })}
                value={formCachorro.nome}
            />

            <TextInput
                style={estilo.input}
                placeholder='Raça'
                onChangeText={ (valor) => setFormCachorro({
                    ...formCachorro, raca: valor
                })}
                value={formCachorro.raca}
            />

            <TextInput
                style={estilo.input}
                placeholder='Pelagem'
                onChangeText={ (valor) => setFormCachorro({
                    ...formCachorro, pelagem: valor
                })}
                value={formCachorro.pelagem}
            />

            <TextInput
                style={estilo.input}
                placeholder='Data de nascimento'
                onChangeText={ (valor) => setFormCachorro({
                    ...formCachorro, datanasc: valor
                })}
                value={formCachorro.datanasc}
            />

            <TouchableOpacity style={estilo.botao}
                onPress={Salvar}
            >
                <Text style={estilo.botaoText}>{botao}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[estilo.botao,estilo.botaoSec]}
                onPress={Limpar}
            >
                <Text style={[estilo.botaoText,estilo.botaoSecText]}>Limpar</Text>
            </TouchableOpacity>
        </View>

    )

}