import ProductCard from 'components/ProductCard';
import { memo, useEffect, useState } from 'react'
import { CarrinhoType, ItensType } from 'types/sistema'
import styles from './Catalogo.module.scss'
import Filtro from './Filtro';
import Ordenador, { OpcoesOrdenador } from './Ordenador';
import { getData } from "services/table"
import Buscador from './Buscador';
import { Divider } from '@mui/material';
import { tablePath } from 'types/database';

function Catalogo() {
    const [items, setItems] = useState<CarrinhoType[]>([])
    const [filtro, setFiltro] = useState<string>('');
    const [busca, setBusca] = useState('');

    const [produtos, setProdutos] = useState<ItensType[]>([])
    const [backup, setBackup] = useState<ItensType[]>([])

    const [ordenador, setOrdenador] = useState<OpcoesOrdenador>('');

    useEffect(() => {
        async function coletarDados() {
            await getData(tablePath, setProdutos, setBackup)
        }
        const info = localStorage.getItem('items');
        if (info) {
            const parsedInfo: CarrinhoType[] = JSON.parse(info);
            setItems(parsedInfo);
        }
        coletarDados()
    }, []);


    function ordenarPropriedade(lista: ItensType[], propriedade: 'title' | 'unityValue', ascending: boolean) {
        if (ascending) {
            return lista.sort((a, b) => a[propriedade] > b[propriedade] ? 1 : -1);
        } else {
            return lista.sort((a, b) => a[propriedade] < b[propriedade] ? 1 : -1);
        }
    }

    useEffect(() => {
        function testaBusca(title: string) {
            const regex = new RegExp(busca, 'i');
            return regex.test(title);
        }

        function testaFiltro(category: string) {
            if (filtro !== '') return filtro === category;
            return true;
        }
        function ordenar(novaLista: ItensType[]) {
            switch (ordenador) {
                case 'nomecrescente':
                    return ordenarPropriedade(novaLista, 'title', true);
                case 'nomedecrescente':
                    return ordenarPropriedade(novaLista, 'title', false);
                case 'precocrescente':
                    return ordenarPropriedade(novaLista, 'unityValue', true);
                case 'precodecrescente':
                    return ordenarPropriedade(novaLista, 'unityValue', false);
                default:
                    return novaLista;
            }
        }

        const novosProdutos = backup.filter(item => testaBusca(item.title) &&
            testaFiltro(item.category))
        setProdutos(novosProdutos)
        setProdutos(ordenar(novosProdutos))
    }, [filtro, ordenador, busca, backup])

    return (
        <div className={styles.corpo}>
            <Buscador
                busca={busca}
                setBusca={setBusca} />
            <div className={styles.filterHeader}>
                <Filtro filtro={filtro} setFiltro={setFiltro} />
                <Ordenador ordenador={ordenador} setOrdenador={setOrdenador} />
            </div>
            <Divider />
            {produtos.length > 0 ?
                <div className={styles.container}>
                    {produtos.map(produto => (
                        <ProductCard {...produto} itemsCarrinho={items} setItemsCarrinho={setItems} />
                    ))}
                </div>
                : <h2 style={{ textAlign: 'center' }}>Nenhum produto a ser exibido!</h2>}
        </div>
    )
}
export default memo(Catalogo)