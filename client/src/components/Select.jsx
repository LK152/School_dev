import { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';

const ControlledSelect = ({ label, name, value, options, onFocus, onChange, onBlur }) => {
    const [localValue, setLocalValue] = useState(value ?? '');
    useEffect(() => setLocalValue(value ?? ''), [value]);

    const handleFocus = () => {
        if (onFocus) {
            onFocus();
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLocalValue(value);
        if (onChange) {
            onChange(name, value);
        }
    };

    const handleBlur = (e) => {
        if (onBlur) {
            onBlur(e.target.value);
        }
    };

    return (
        <Select 
            label={label} 
            name={name} 
            value={localValue} 
            onFocus={handleFocus} 
            onChange={handleChange} 
            onBlur={handleBlur} 
        >
            {options?.map(option => {
                return (
                    <MenuItem key={Math.random().toString(36).substring(2, 9)} value={option.value}>
                        {option.label ?? option.value}
                    </MenuItem>
                )
            })}
        </Select>
    )
}

export default ControlledSelect;