import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styles from './EditItem.module.scss'
import { TransitionProps } from '@mui/material/transitions';
import { ItensType } from 'types/sistema';
import InputBox from 'components/InputBox';
import BotaoHover from 'components/BotaoHover';
import { updateData } from 'services/table';
import InputCurrency from 'components/InputCurrency';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditItem(props: ItensType) {
    const [data, setData] = React.useState<ItensType>(props)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function editarDados() {
        const response = await updateData('Itens', data.id, data)
        if (response === 'success') {
            alert('Dados atualizados com sucesso!')
            window.location.reload()
        } else {
            alert(`Ocorreu o erro ${response}!`)
        }
    }

    return (
        <React.Fragment>
            <button className={styles.editIcon}>
                <label onClick={handleClickOpen}><EditIcon /></label>
            </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle style={{ textAlign: 'center' }}>{`Edição de informações sobre o item de ID ${data.id}`}</DialogTitle>
                <DialogContent className={styles.inputs}>
                    {data !== null && Object.entries(data).map(([field, value]) => (
                        (field !== 'id' && field !== 'image' && field !== 'unityValue') &&
                        <InputBox label={field} key={field}
                            texto={value} onChange={e => setData({ ...data, [field]: e.target.value })} />
                    ))}
                    <InputCurrency label='Preço' texto={data.unityValue.toString()} onChange={e => setData({ ...data, unityValue: e.target.value })} />
                    <BotaoHover text='Alterar dados' onClick={() => editarDados()} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}