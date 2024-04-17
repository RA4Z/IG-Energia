import styles from './ImportImage.module.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { deleteImage, insertImage, updateImage } from 'services/table';
import { ItensType } from 'types/sistema';

interface Props {
    setLoading: any
    data: ItensType,
}

export default function ImportImage(props: Props) {

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            try {
                props.setLoading(true)
                const index = props.data.image.lastIndexOf('/');
                const filename = props.data.image.substring(index + 1);
                if (props.data.image !== '') await deleteImage(filename)
                const url = await insertImage(file, `imagemId${props.data.id}.jpg`);
                const result = await updateImage('Itens', props.data.id, url)
                props.setLoading(false)
                if (result === 'success') {
                    window.location.reload()
                } else {
                    alert(`Ocorreu o erro ${result}`)
                }

            } catch (error) {
                console.error('Erro ao carregar a imagem:', error);
            }
        };
    }

    return (
        <div className={styles.export} >
            <label htmlFor={`selecao-arquivo${props.data.id}`}><AddPhotoAlternateIcon fontSize='large' /></label>
            <input className={styles.export} id={`selecao-arquivo${props.data.id}`} type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
        </div>
    );
}