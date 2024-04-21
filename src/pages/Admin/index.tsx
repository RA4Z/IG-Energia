import { supabase } from "config/supabase"
import { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import InputBox from "components/InputBox"

import styles from './Admin.module.scss'
import { getData } from "services/table"
import BotaoHover from "components/BotaoHover"
import { insertData } from "services/table"
import { algumCampoVazio, formatoMoneyBR } from "utils"
import { ItensDefault, ItensType } from "types/sistema"
import ImportImage from "components/ImportImage"
import EditItem from "./EditItem"
import DeleteItem from "./DeleteItem"
import Loading from "components/Loading"
import InputCurrency from "components/InputCurrency"
import { admMail, tablePath } from "types/database"

function Admin() {
    const navigate = useNavigate()
    const [data, setData] = useState<ItensType>(ItensDefault)
    const [dados, setDados] = useState<ItensType[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getUserLogged() {
            const user = (await supabase.auth.getUser()).data.user?.email
            if (user === undefined) {
                navigate('/Login')
            } else {
                if(user === admMail) {
                    await getData(tablePath, setDados)
                } else {
                    navigate('/')
                }
            }
        }
        getUserLogged()
    }, [navigate])

    async function cadastrar() {
        if (algumCampoVazio(data)) return alert('Por favor, preencha todos os campos antes de realizar o cadastro.');

        setLoading(true)
        const result = await insertData(tablePath, data)
        setLoading(false)
        if (result === 'success') {
            alert('Produto cadastrado com sucesso!')
            window.location.reload()
        } else {
            alert(`Ocorreu o erro ${result}!`)
        }
    }

    return (
        <div className={styles.container}>
            <Loading open={loading} />
            <h1>Janela de Administração</h1>
            <div className={styles.form}>
                {data !== null && Object.entries(data).map(([field, value]) => (
                    (field !== 'id' && field !== 'image' && field !== 'unityValue') &&
                    <InputBox label={field} key={field}
                        texto={value} onChange={e => setData({ ...data, [field]: e.target.value })} />
                ))}
                <InputCurrency label='Preço' texto={data.unityValue.toString()} onChange={e => setData({ ...data, unityValue: e.target.value })} />
            </div>
            <BotaoHover text="Realizar Cadastro" onClick={() => cadastrar()} />
            <div className={styles.lista}>
                {dados.map(dado => (
                    <div className={styles.lista__card} key={dado.title}>
                        <DeleteItem data={dado} setLoading={setLoading} />
                        <EditItem {...dado} />
                        <h1>{dado.title}</h1>
                        <div className={styles.lista__card__header}>
                            <img src={dado.image} alt={dado.title} />
                            <ImportImage setLoading={setLoading} data={dado} />
                        </div>
                        <h3>{dado.category}</h3>
                        <h3>{dado.information}</h3>
                        <h3>{formatoMoneyBR.format(dado.unityValue)}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default memo(Admin)