import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './styles.css'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
import { admMail } from 'types/database';

interface Props {
    user?: string
}

export default function Hamburguer(props: Props) {
    const navigate = useNavigate()

    async function close(popupState: any, path: string) {
        await popupState.close();
        navigate(path)
        if (popupState.isOpen) {
            setTimeout(function () {
                popupState.close();
            }, 100);
        }
        const menuHamburguer = document.getElementById('menuHamburguer') as HTMLInputElement;
        menuHamburguer.checked = false
    }

    return (
        <PopupState variant="popover" popupId="demo-popup-menu" >
            {(popupState) => (
                <>
                    <input
                        id='menuHamburguer'
                        type="checkbox"
                        defaultChecked={false}
                        role="button"
                        aria-label="Display the menu"
                        className='menu'
                        {...bindTrigger(popupState)} // Usando bindTrigger para outras propriedades
                    />

                    <Menu {...bindMenu(popupState)} onClick={() => { popupState.close(); const menuHamburguer = document.getElementById('menuHamburguer') as HTMLInputElement; menuHamburguer.checked = false }}>
                        {props.user === admMail && <MenuItem onClick={() => close(popupState, '/Admin')}>Administração</MenuItem>}
                        <MenuItem onClick={() => close(popupState, '/')}>Home</MenuItem>
                        <MenuItem onClick={() => close(popupState, '/Catalogo')}>Catálogo</MenuItem>
                        <MenuItem onClick={() => close(popupState, '/Agendamento')}>Agendamento</MenuItem>
                        <MenuItem onClick={() => close(popupState, '/Carrinho')}>Carrinho</MenuItem>
                        <MenuItem onClick={() => close(popupState, '/Sobre')}>Sobre nós</MenuItem>
                    </Menu>
                </>
            )}
        </PopupState>
    );
}