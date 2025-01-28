import { Divider } from '@mui/material'
import Fechar from 'assets/fechar.svg'
import styles from './Carrinho.module.scss'
import SelectNumber from 'components/SelectNumber'
import { formatoMoneyBR } from 'utils'
import { memo, useEffect, useState } from 'react'
import InputOption from 'components/InputOption'
import Whatsapp from 'components/Whatsapp'
import { CarrinhoType } from 'types/sistema'
import { BasicRules } from 'utils/basicRules'

function Carrinho() {
    BasicRules()
    const [envio, setEnvio] = useState('')
    const [items, setItems] = useState<CarrinhoType[]>([])
    const [deletando, setDeletando] = useState(false)

    useEffect(() => {
        const info = localStorage.getItem('items');
        if (info) {
            const parsedInfo: CarrinhoType[] = JSON.parse(info);
            setItems(parsedInfo);
        }
    }, []);

    useEffect(() => {
        if (items.length > 0 || deletando) {
            const itemsString = JSON.stringify(items);
            localStorage.setItem('items', itemsString);
            setDeletando(false)
        }
    }, [items, deletando])

    return (
        <div className={styles.container}>
            {items.length > 0 ? <>
                <div className={styles.items}>
                    <div className={styles.items__title}>
                        <h1>Carrinho de Compras</h1>
                        <h4>{items.length} {items.length > 1 ? 'itens' : 'item'}</h4>
                    </div>
                    <Divider style={{ width: '100%' }} />
                    <div className={styles.items__container}>{items.map((item, index) => (
                        <div key={index}>
                            <div className={styles.item}>
                                <div className={styles.item__principal}>
                                    <img className={styles.item__produto} src={item.image} alt='Imagem' />
                                    <li className={styles.item__title}>{item.title}</li>
                                </div>
                                <SelectNumber
                                    items={item}
                                    quantity={item.quantity}
                                    setQuantity={(newObject: any) => {
                                        const updatedItems = [...items];
                                        updatedItems[index].quantity = newObject.quantity;
                                        updatedItems[index].value = Number(updatedItems[index].quantity) * Number(updatedItems[index].unityValue);
                                        setItems(updatedItems);
                                    }}
                                />
                                <li className={styles.item__value}>{formatoMoneyBR.format(item.value)}</li>
                                <img className={styles.item__delete} src={Fechar} alt='Excluir do carrinho'
                                    onClick={() => {
                                        const carrinho = [...items];
                                        carrinho.splice(index, 1); // Remove o item do carrinho
                                        setDeletando(true)
                                        setItems(carrinho); // Atualiza o estado do carrinho
                                    }}
                                />
                            </div>
                            <Divider style={{ width: '100%' }} />
                        </div>
                    ))}

                    </div>
                </div>
                <div className={styles.summary}>
                    <div className={styles.summary__title}>
                        <h1>Sumário</h1>
                    </div>
                    <Divider style={{ width: '100%' }} />
                    <div className={styles.summary__resumo}>
                        <li>{items.length} {items.length > 1 ? 'itens' : 'item'}</li>
                        <li>{formatoMoneyBR.format(items.reduce((total, item) => total + item.value, 0))}</li>
                    </div>
                    <div className={styles.summary__formulario}>
                        <InputOption dados={envio} setDados={setEnvio} />
                        {envio !== '' && <Whatsapp
                            message={`Olá, estou fazendo esse pedido a partir do Site!\n
Segue abaixo meu pedido:\n
${(items.map(item => `${item.title} x ${item.quantity} = ${formatoMoneyBR.format(item.value)}`)).join('\n')}\n
O valor total será de ${formatoMoneyBR.format(items.reduce((total, item) => total + item.value, 0))}
E no recebimento do pedido escolhi a opção ${envio}\n
Muito obrigado!`}
                        />}
                    </div>
                </div>
            </> :
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <h2 style={{ textAlign: 'center' }}>Não há itens no carrinho!</h2>
                </div>}
        </div>
    )
}
export default memo(Carrinho)