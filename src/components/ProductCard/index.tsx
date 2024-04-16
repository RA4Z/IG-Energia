import AddCarrinho from 'assets/add_carrinho.svg'
import Check from 'assets/check.svg'
import RemoveCarrinho from 'assets/remove_carrinho.svg'
import Info from 'assets/info.svg'

import { formatoMoneyBR } from 'utils'
import styles from './ProductCard.module.scss'
import { useEffect, useState } from 'react'
import { CarrinhoType } from 'types/sistema'
import classNames from 'classnames'

interface Props {
    id: any,
    title: string,
    unityValue: number,
    image: string,
    information: string,
    itemsCarrinho: CarrinhoType[]
    setItemsCarrinho: any
}

export default function ProductCard(props: Props) {
    const [deletando, setDeletando] = useState(false)
    const [detectado, setDetectado] = useState(false)
    const [selected, setSelected] = useState(false)

    const adicionar = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const elementoAtual = event.currentTarget.parentElement?.parentElement;
        if (elementoAtual) {
            elementoAtual.style.transform = 'translateX(-50%)';
        }
        const carrinhoAtualizado = [...props.itemsCarrinho];
        carrinhoAtualizado.push({
            id: props.id, title: props.title, image: props.image,
            quantity: 1, unityValue: props.unityValue, value: props.unityValue
        })
        props.setItemsCarrinho(carrinhoAtualizado);
    };

    const remover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const elementoAtual = event.currentTarget.parentElement?.parentElement;
        if (elementoAtual) {
            elementoAtual.style.transform = 'none';
        }
        const carrinhoAtualizado = [...props.itemsCarrinho];
        const index = props.itemsCarrinho.findIndex(objeto => objeto.id === props.id)
        carrinhoAtualizado.splice(index, 1)
        props.setItemsCarrinho(carrinhoAtualizado)
        setDeletando(true)
    };

    useEffect(() => {
        setDetectado(false)
        if (props.itemsCarrinho.length > 0 || deletando) {
            const itemsString = JSON.stringify(props.itemsCarrinho);
            localStorage.setItem('items', itemsString);
        }
        if (props.itemsCarrinho.some(objeto => objeto.id === props.id)) {
            setDetectado(true)
            setSelected(true)
        }
        if (!detectado) {
            setSelected(false)
        }
    }, [props.itemsCarrinho, deletando, props.id, detectado])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img src={props.image} alt={`Imagem de ${props.title}`} className={styles.top} />
                <div className={classNames(
                    styles.bottom,
                    styles[`bottom${selected ? '--cart' : ''}`]
                )}>
                    <div className={styles.left}>
                        <div className={styles.details}>
                            <li>{props.title}</li>
                            <p>{formatoMoneyBR.format(props.unityValue)}</p>
                        </div>
                        <div onClick={adicionar} className={styles.buy}><img src={AddCarrinho} alt='Adicionar item ao Carrinho' /></div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.done}><img src={Check} alt='Confirmado' /></div>
                        <div className={styles.details}>
                            <p>Item adicionado ao seu carrinho</p>
                        </div>
                        <div onClick={remover} className={styles.remove}><img src={RemoveCarrinho} alt='Remover item do Carrinho' /></div>
                    </div>
                </div>
            </div>
            <div className={styles.inside}>
                <div className={styles.icon}><img src={Info} alt='Informações' /></div>
                <div className={styles.contents}>
                    <table>
                        <tr>
                            <th>Informações:</th>
                        </tr>
                        <tr>
                            <td>{props.information}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}