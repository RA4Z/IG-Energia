import React from 'react';
import styles from './ImportImage.module.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { insertImage } from 'services/table';
import { ItensType } from 'types/sistema';

interface Props {
    data: ItensType,
    setData: any
}

function ImportImage(props: Props) {
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            try {
                const url = await insertImage(file, `Teste.jpg`);
                props.setData({ ...props.data, image: url })
            } catch (error) {
                console.error('Erro ao carregar a imagem:', error);
            }
        };
    }

    return (
        <div className={styles.export} >
            <label htmlFor='selecao-arquivo'><AddPhotoAlternateIcon fontSize='large' /></label>
            <input id='selecao-arquivo' type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
        </div>
    );
}

export default ImportImage;