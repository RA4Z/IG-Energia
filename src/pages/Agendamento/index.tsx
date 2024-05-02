import styles from './Agendamento.module.scss'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import classNames from 'classnames';
import { horariosAtendimento } from './horarios';
import BotaoMain from 'components/BotaoMain';

export default function Agendamento() {
    const [diaAgendado, setdiaAgendado] = useState(dayjs());
    const [horarioAgendado, setHorarioAgendado] = useState('')

    function selecionarHorario(horario: any) {
        if (horarioAgendado === horario) return setHorarioAgendado('');
        return setHorarioAgendado(horario);
    }
    async function fazerAgendamento() {

    }
    return (
        <div className={styles.container}>
            <div className={styles.selecionar}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar className={styles.calendar}
                        minDate={dayjs()}
                        value={diaAgendado}
                        onChange={(newValue) => setdiaAgendado(newValue)} />
                </LocalizationProvider>
                <div className={styles.selecionar__horario}>
                    <p>Selecione o horário desejado de atendimento:</p>
                    <ul>
                        {horariosAtendimento.map((atendimento, index) => (
                            <li className={classNames({
                                [styles.blocked]: !atendimento.disponivel,
                                [styles.list]: atendimento.disponivel,
                                [styles['list--ativo']]: horarioAgendado === atendimento.horario
                            })} key={index} onClick={() => atendimento.disponivel && selecionarHorario(atendimento.horario)}>
                                {atendimento.horario}
                            </li>
                        ))}
                    </ul>
                    <BotaoMain text='Agendar Horário' onClick={() => fazerAgendamento} />
                </div>
            </div>
        </div>
    )
}