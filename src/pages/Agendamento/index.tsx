import styles from './Agendamento.module.scss'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { horariosDisponiveis, horariosReservados } from './horarios';
import BotaoMain from 'components/BotaoMain';

export default function Agendamento() {
    const [diaAgendado, setdiaAgendado] = useState(dayjs());
    const [horariosLivres, setHorariosLivres] = useState(horariosDisponiveis.durante_semana)
    const [horarioAgendado, setHorarioAgendado] = useState('')
    const [tipoAgendamento, setTipoAgendamento] = useState([
        {
            nome: 'Fazer a Barba',
            selecionado: false
        },
        {
            nome: 'Corte de Cabelo',
            selecionado: false
        },
        {
            nome: 'Sobrancelha',
            selecionado: false
        },
        {
            nome: 'Outro',
            selecionado: false
        },
    ])

    useEffect(() => {
        let horariosLivres = horariosDisponiveis[diaAgendado.day() === 6 ? 'final_semana' : 'durante_semana'].slice();
        if (diaAgendado.day() <= 1) horariosLivres = []
        const horarios = horariosReservados.reduce((acc: string[], reserva) => {
            if (reserva.dia === diaAgendado.format('YYYY-MM-DD')) {
                acc.push(reserva.horario);
            }
            return acc;
        }, []);

        horariosLivres.forEach(horario => {
            horario.disponivel = !horarios.includes(horario.horario);
        });

        setHorariosLivres(horariosLivres);
    }, [diaAgendado]);

    function selecionarHorario(horario: any) {
        if (horarioAgendado === horario) return setHorarioAgendado('');
        return setHorarioAgendado(horario);
    }

    function alterarTipoAgendamento(index: any) {
        const updatedItems = [...tipoAgendamento];
        updatedItems[index].selecionado = !updatedItems[index].selecionado;
        setTipoAgendamento(updatedItems)
    }

    async function fazerAgendamento() {
        if (!tipoAgendamento.some(item => item.selecionado)) return alert('Selecione algum dos tipos de atendimento disponíveis!')
        if (horarioAgendado === '') return alert('Selecione algum horário disponível!')
        alert(`Atendimento agendado com sucesso para o dia ${dayjs(diaAgendado).format('YYYY-MM-DD')} no horário ${horarioAgendado}`)
    }
    return (
        <div className={styles.container}>
            <div className={styles.tipo}>
                {tipoAgendamento.map((tipo, index) => (
                    <button className={classNames({
                        [styles.list]: true,
                        [styles['list--ativo']]: tipo.selecionado
                    })} key={index} onClick={() => alterarTipoAgendamento(index)}>
                        {tipo.nome}
                    </button>
                ))}
            </div>
            <div className={styles.selecionar}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar className={styles.calendar}
                        minDate={dayjs()}
                        value={diaAgendado}
                        onChange={(newValue) => { setdiaAgendado(newValue); setHorarioAgendado('') }} />
                </LocalizationProvider>
                <div className={styles.selecionar__horario}>
                    <p>Selecione o horário desejado de atendimento:</p>
                    <ul>
                        {horariosLivres.map((atendimento, index) => (
                            <li className={classNames({
                                [styles.blocked]: !atendimento.disponivel,
                                [styles.list]: atendimento.disponivel,
                                [styles['list--ativo']]: horarioAgendado === atendimento.horario
                            })} key={index} onClick={() => atendimento.disponivel && selecionarHorario(atendimento.horario)}>
                                {atendimento.horario}
                            </li>
                        ))}
                    </ul>
                    {horariosLivres.length > 0 && <BotaoMain text='Agendar Horário' onClick={() => fazerAgendamento()} />}
                </div>
            </div>
        </div>
    )
}