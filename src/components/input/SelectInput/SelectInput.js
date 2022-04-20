import Button from '../Button/Button';

export default function SelectInput({ children, options, selected, placeholder, ...props }) {
    return (
        <Button as="select" defaultValue={selected} {...props} >
            { placeholder && <option value="">{placeholder}</option>}
            { options ? options.map(option => (<option key={option} value={option}>{option}</option>)) : children }
        </Button>
    )
}