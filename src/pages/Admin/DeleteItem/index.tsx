import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styles from './DeleteItem.module.scss'
import { TransitionProps } from '@mui/material/transitions';
import { ItensType } from 'types/sistema';
import DeleteIcon from '@mui/icons-material/Delete';
import BotaoHover from 'components/BotaoHover';
import { deleteData } from 'services/table';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteItem(props: ItensType) {
    const data: ItensType = props
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function deletarItem() {
        const response = await deleteData('Itens', data.id)
        if (response === 'success') {
            alert('Item deletado com sucesso!')
            window.location.reload()
        } else {
            alert(`Ocorreu o erro ${response}!`)
        }
    }

    return (
        <React.Fragment>
            <button className={styles.deleteIcon}>
                <label onClick={handleClickOpen}><DeleteIcon /></label>
            </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle style={{ textAlign: 'center' }}>{`Tem certeza de que deseja deletar o item de ID ${data.id} - ${data.title}?`}</DialogTitle>
                <DialogContent className={styles.inputs}>
                    <BotaoHover text='Deletar Item' onClick={() => deletarItem()} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}