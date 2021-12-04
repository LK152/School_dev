import { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';

const ControlledSelect = ({ label, value, options, onFocus, onChange, onBlur }) => {
    const [localValue, setLocalValue] = useState(value ?? '');
    useEffect(() => setLocalValue(value ?? ''), [value]);

    const handleFocus = () => {
        if (onFocus) {
            onFocus();
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setLocalValue(value);
        if (onChange) {
            onChange(value);
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
            value={localValue} 
            onFocus={handleFocus} 
            onChange={handleChange} 
            onBlur={handleBlur} 
        >
            {options?.map(option => {
                return (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label ?? option.value}
                    </MenuItem>
                )
            })}
        </Select>
    )
}

export default ControlledSelect;