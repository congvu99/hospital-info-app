import React from 'react';
import { useField } from 'formik';
import { DatePicker } from '@progress/kendo-react-dateinputs';

interface DateInputProps {
    label: string;
    error?: string | boolean;
    children: React.ReactNode;
}

const DateInput: React.FC<DateInputProps> = ({ label, error, children }) => (
    <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>{label}</label>
        {children}
        {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
    </div>
);

interface FormikDatePickerProps {
    name: string;
    label: string;
    placeholder?: string;
    format?: string;
    min?: Date;
    max?: Date;
}

export const FormikDatePicker: React.FC<FormikDatePickerProps> = ({
                                                                      name,
                                                                      label,
                                                                      placeholder,
                                                                      format = 'MM/dd/yyyy',
                                                                      min,
                                                                      max,
                                                                  }) => {
    const [field, meta, helpers] = useField(name);

    return (
        <DateInput label={label} error={meta.touched && meta.error}>
            <DatePicker
                style={{ width: '300px' }}
                value={field.value ? new Date(field.value) : null}
                onChange={(e) => helpers.setValue(e.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={placeholder}
                format={format}
                min={min}
                max={max}
            />
        </DateInput>
    );
};
