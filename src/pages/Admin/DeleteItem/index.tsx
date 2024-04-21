import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styles from './DeleteItem.module.scss'
import { TransitionProps } from '@mui/material/transitions';
import { ItensType } from 'types/sistema';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteData, deleteImage } from 'services/table';
import Button from '@mui/material/Button';
import { tablePath } from 'types/database';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    data: ItensType,
    setLoading: any
}

export default function DeleteItem(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function deletarItem() {
        props.setLoading(true)
        const index = props.data.image.lastIndexOf('/');
        const filename = props.data.image.substring(index + 1);
        if (props.data.image !== '') await deleteImage(filename)
        const response = await deleteData(tablePath, props.data.id)
        if (response === 'success') {
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
                <DialogTitle style={{ textAlign: 'center' }}>{`Tem certeza de que deseja deletar o item de ID ${props.data.id} - ${props.data.title}?`}</DialogTitle>
                <DialogContent className={styles.inputs}>
                    <Button className={styles.inputs__cancelar} autoFocus onClick={handleClose}>Cancelar</Button>
                    <Button className={styles.inputs__deletar} onClick={() => deletarItem()}  >Deletar Item</Button>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}