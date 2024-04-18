import './styles.css'
interface Props {
    texto: any,
    onChange: (_: any) => any,
    label: string
}
export default function InputCurrency(props: Props) {
    return (
        <div className='inputBox'>
            <input placeholder=''
                type='number'
                min={0.00} step="0.01"
                value={props.texto}
                onChange={props.onChange} />
            <span>{props.label}</span>
        </div>
    )
}